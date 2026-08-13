import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ArrowLeft, RotateCcw } from "lucide-react"
import {
  createInitialState,
  getValidCells,
  getJackType,
  placeChip,
  removeChip,
  playTwoEyedJack,
  checkForSequences,
  checkWinCondition,
  isDraw,
  isDeadCard,
  discardDeadCard,
  discardOneEyedJackNoTargets,
  BOARD_LAYOUT,
} from "@/lib/sequence-engine"
import type { GameState } from "@/lib/sequence-engine"

interface UIState {
  selectedCardIndex: number | null
  highlightedCells: number[]
  errorMessage: string | null
}

const initialUIState: UIState = {
  selectedCardIndex: null,
  highlightedCells: [],
  errorMessage: null,
}

// ─── Stub Components ─────────────────────────────────────────────────────────

function StatusBar({
  gameState,
  onNewGame,
}: {
  gameState: GameState
  onNewGame: () => void
}) {
  const p1Sequences = gameState.sequences.filter((s) => s.player === 1).length
  const p2Sequences = gameState.sequences.filter((s) => s.player === 2).length
  const deckCount = gameState.deck.length
  const isGameOver = gameState.phase === "won" || gameState.phase === "draw"

  return (
    <div className="mb-2 rounded-lg border border-[#44475a] bg-[#313342]/60 px-4 py-2">
      <div className="flex items-center justify-between text-xs">
        {/* Left section: turn or end-game message */}
        <div className="flex items-center gap-3">
          {gameState.phase === "won" ? (
            <span
              className={
                gameState.winner === 1
                  ? "font-semibold text-terminal-cyan"
                  : "font-semibold text-terminal-purple"
              }
            >
              Player {gameState.winner} wins!
            </span>
          ) : gameState.phase === "draw" ? (
            <span className="font-semibold text-[#6272a4]">
              Draw — no cards remain!
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  gameState.currentPlayer === 1
                    ? "bg-terminal-cyan"
                    : "bg-terminal-purple"
                }`}
              />
              <span
                className={
                  gameState.currentPlayer === 1
                    ? "text-terminal-cyan"
                    : "text-terminal-purple"
                }
              >
                Player {gameState.currentPlayer}'s turn
              </span>
            </span>
          )}
        </div>

        {/* Center section: sequence counts and deck */}
        <div className="flex items-center gap-3 text-[#6272a4]">
          <span>
            <span className="text-terminal-cyan">P1</span>: {p1Sequences}/2 seq
          </span>
          <span className="text-[#44475a]">|</span>
          <span>
            <span className="text-terminal-purple">P2</span>: {p2Sequences}/2
            seq
          </span>
          <span className="text-[#44475a]">|</span>
          {deckCount === 0 ? (
            <span className="font-semibold text-terminal-red">Deck empty</span>
          ) : (
            <span>Deck: {deckCount}</span>
          )}
        </div>

        {/* Right section: New Game button (post-game) */}
        {isGameOver && (
          <button
            onClick={onNewGame}
            className="inline-flex items-center gap-1 text-terminal-green transition-colors hover:text-terminal-cyan"
          >
            <RotateCcw className="h-3 w-3" />
            New Game
          </button>
        )}
      </div>
    </div>
  )
}

function getSuitSymbol(suit: string): string {
  switch (suit) {
    case "hearts":
      return "♥"
    case "diamonds":
      return "♦"
    case "clubs":
      return "♣"
    case "spades":
      return "♠"
    default:
      return ""
  }
}

function getSuitColor(suit: string): string {
  return suit === "hearts" || suit === "diamonds"
    ? "text-red-400"
    : "text-[#f8f8f2]"
}

const FREE_SPACE_INDICES = [0, 9, 90, 99]

function BoardGrid({
  gameState,
  highlightedCells,
  onCellClick,
}: {
  gameState: GameState
  highlightedCells: number[]
  onCellClick: (cellIndex: number) => void
}) {
  return (
    <div className="rounded-lg border border-[#44475a] bg-[#313342]/60 p-2">
      <div className="grid grid-cols-10 gap-0.5">
        {gameState.board.map((cell, index) => {
          const isFreeSpace = FREE_SPACE_INDICES.includes(index)
          const isHighlighted = highlightedCells.includes(index)
          const isWon = gameState.phase === "won"
          const isPartOfSequence = cell.partOfSequence && isWon
          const layoutCard = BOARD_LAYOUT[index]

          let cellClasses =
            "flex aspect-square w-full items-center justify-center rounded-sm border text-xs leading-tight cursor-pointer select-none transition-all "

          // Base styling
          if (cell.chip === "cyan") {
            cellClasses +=
              "bg-terminal-cyan/20 border-terminal-cyan "
          } else if (cell.chip === "purple") {
            cellClasses +=
              "bg-terminal-purple/20 border-terminal-purple "
          } else {
            cellClasses += "bg-[#282a36] border-[#44475a] "
          }

          // Highlight valid cells
          if (isHighlighted) {
            cellClasses +=
              "ring-2 ring-terminal-green bg-terminal-green/10 "
          }

          // Winning glow
          if (isPartOfSequence) {
            cellClasses += "shadow-[0_0_8px] shadow-terminal-green "
          }

          return (
            <button
              key={index}
              className={cellClasses}
              onClick={() => onCellClick(index)}
              aria-label={
                isFreeSpace
                  ? "Free space"
                  : layoutCard
                    ? `${layoutCard.rank} of ${layoutCard.suit}`
                    : ""
              }
            >
              {isFreeSpace ? (
                <span className="text-sm text-terminal-green">★</span>
              ) : layoutCard ? (
                <span
                  className={`text-center font-medium ${getSuitColor(layoutCard.suit)}`}
                >
                  {layoutCard.rank}
                  {getSuitSymbol(layoutCard.suit)}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PlayerHand({
  gameState,
  selectedCardIndex,
  highlightedCells,
  onCardSelect,
  onDiscardDead,
  onDiscardOneEyedJack,
}: {
  gameState: GameState
  selectedCardIndex: number | null
  highlightedCells: number[]
  onCardSelect: (cardIndex: number) => void
  onDiscardDead: (cardIndex: number) => void
  onDiscardOneEyedJack: (cardIndex: number) => void
}) {
  const activeHand = gameState.hands[gameState.currentPlayer - 1]
  const inactivePlayer = gameState.currentPlayer === 1 ? 2 : 1
  const inactiveHand = gameState.hands[inactivePlayer - 1]

  return (
    <div className="space-y-2">
      {/* Active player's hand */}
      <div className="rounded-lg border border-[#44475a] bg-[#313342]/60 p-3">
        <p
          className={`mb-2 text-xs font-semibold ${
            gameState.currentPlayer === 1
              ? "text-terminal-cyan"
              : "text-terminal-purple"
          }`}
        >
          Player {gameState.currentPlayer}&apos;s Hand
        </p>
        <div className="flex flex-wrap gap-1.5">
          {activeHand.map((card, index) => {
            const isSelected = selectedCardIndex === index
            const isDead = isDeadCard(card, gameState.board)
            const jackType = getJackType(card)
            const isOneEyedJackNoTargets =
              isSelected &&
              jackType === "one-eyed" &&
              highlightedCells.length === 0

            return (
              <div key={index} className="flex flex-col items-center gap-0.5">
                <button
                  onClick={() => onCardSelect(index)}
                  className={`relative flex h-12 w-9 items-center justify-center rounded-md border-2 transition-all ${
                    isSelected
                      ? "border-terminal-green -translate-y-1"
                      : "border-[#44475a]"
                  } bg-[#282a36] text-sm`}
                  aria-label={`${card.rank} of ${card.suit}${isSelected ? " (selected)" : ""}${isDead ? " (dead card)" : ""}`}
                >
                  <span
                    className={`font-medium ${getSuitColor(card.suit)}`}
                  >
                    {card.rank}
                    {getSuitSymbol(card.suit)}
                  </span>
                  {isDead && (
                    <span className="absolute -top-1 -right-1 rounded-sm bg-[#282a36] px-0.5 text-[8px] font-bold text-terminal-red">
                      ✕
                    </span>
                  )}
                </button>
                {/* Dead card discard button */}
                {isDead && (
                  <button
                    onClick={() => onDiscardDead(index)}
                    className="rounded border border-terminal-red/40 px-1 py-0.5 text-[8px] text-terminal-red transition-colors hover:bg-terminal-red/10"
                  >
                    Discard
                  </button>
                )}
                {/* One-eyed jack no targets discard button */}
                {isOneEyedJackNoTargets && (
                  <button
                    onClick={() => onDiscardOneEyedJack(index)}
                    className="rounded border border-terminal-yellow/40 px-1 py-0.5 text-[8px] text-terminal-yellow transition-colors hover:bg-terminal-yellow/10"
                  >
                    Discard
                  </button>
                )}
              </div>
            )
          })}
        </div>
        {/* No valid moves message */}
        {selectedCardIndex !== null &&
          highlightedCells.length === 0 &&
          !isDeadCard(activeHand[selectedCardIndex], gameState.board) && (
            <p className="mt-1 text-center text-xs text-terminal-red">
              No valid moves for this card
            </p>
          )}
      </div>

      {/* Inactive player's hand (card backs) */}
      <div className="rounded-lg border border-[#44475a] bg-[#313342]/60 p-3">
        <p
          className={`mb-2 text-xs font-semibold ${
            inactivePlayer === 1
              ? "text-terminal-cyan"
              : "text-terminal-purple"
          }`}
        >
          Player {inactivePlayer}&apos;s Hand
        </p>
        <div className="flex flex-wrap gap-1.5">
          {inactiveHand.map((_, index) => (
            <div
              key={index}
              className="flex h-12 w-9 items-center justify-center rounded-md border-2 border-[#44475a] bg-[#44475a]"
              aria-label="Card back"
            >
              <span className="text-[10px] text-[#6272a4]">?</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GameControls({ onNewGame }: { onNewGame: () => void }) {
  return (
    <button
      onClick={onNewGame}
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#44475a] bg-[#313342]/60 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-terminal-cyan hover:bg-[#313342]"
    >
      <RotateCcw className="h-3 w-3" />
      New Game
    </button>
  )
}

// ─── Page Component ──────────────────────────────────────────────────────────

export function SequencePage() {
  const [gameState, setGameState] = useState<GameState>(createInitialState)
  const [uiState, setUIState] = useState<UIState>(initialUIState)
  const containerRef = useRef<HTMLDivElement>(null)

  // GSAP entrance animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
      )
    }
  }, [])

  // New game handler
  const handleNewGame = () => {
    setGameState(createInitialState())
    setUIState(initialUIState)
  }

  // Card selection handler
  const handleCardSelect = (cardIndex: number) => {
    if (gameState.phase !== "playing") return

    // Toggle deselect
    if (uiState.selectedCardIndex === cardIndex) {
      setUIState(initialUIState)
      return
    }

    const hand = gameState.hands[gameState.currentPlayer - 1]
    const card = hand[cardIndex]
    if (!card) return

    const jackType = getJackType(card)
    const validCells = getValidCells(card, gameState.board, gameState.currentPlayer)

    // If one-eyed jack with no targets, show message
    if (jackType === "one-eyed" && validCells.length === 0) {
      setUIState({
        selectedCardIndex: cardIndex,
        highlightedCells: [],
        errorMessage: "No removable opponent chips available.",
      })
      return
    }

    setUIState({
      selectedCardIndex: cardIndex,
      highlightedCells: validCells,
      errorMessage: null,
    })
  }

  // Dead card discard handler
  const handleDiscardDead = (cardIndex: number) => {
    if (gameState.phase !== "playing") return

    const result = discardDeadCard(gameState, cardIndex)
    if (!result.success) {
      setUIState((prev) => ({ ...prev, errorMessage: result.error }))
      return
    }

    let newState = result.state

    // Check for draw
    if (isDraw(newState)) {
      newState = { ...newState, phase: "draw" }
    }

    setGameState(newState)
    setUIState(initialUIState)
  }

  // One-eyed jack discard (no targets) handler
  const handleDiscardOneEyedJack = (cardIndex: number) => {
    if (gameState.phase !== "playing") return

    const result = discardOneEyedJackNoTargets(gameState, cardIndex)
    if (!result.success) {
      setUIState((prev) => ({ ...prev, errorMessage: result.error }))
      return
    }

    let newState = result.state

    // Check for draw
    if (isDraw(newState)) {
      newState = { ...newState, phase: "draw" }
    }

    setGameState(newState)
    setUIState(initialUIState)
  }

  // Cell click handler
  const handleCellClick = (cellIndex: number) => {
    // Prevent plays when game is over (Req 5.5)
    if (gameState.phase !== "playing") return

    // Check if a card is selected (Req 3.7)
    if (uiState.selectedCardIndex === null) {
      setUIState((prev) => ({
        ...prev,
        errorMessage: "Select a card first",
      }))
      return
    }

    const hand = gameState.hands[gameState.currentPlayer - 1]
    const card = hand[uiState.selectedCardIndex]
    if (!card) return

    const jackType = getJackType(card)

    let result
    if (jackType === "two-eyed") {
      result = playTwoEyedJack(gameState, uiState.selectedCardIndex, cellIndex)
    } else if (jackType === "one-eyed") {
      result = removeChip(gameState, uiState.selectedCardIndex, cellIndex)
    } else {
      result = placeChip(gameState, uiState.selectedCardIndex, cellIndex)
    }

    if (!result.success) {
      setUIState((prev) => ({
        ...prev,
        errorMessage: result.error,
      }))
      return
    }

    // Successful move — update state
    let newState = result.state

    // Check for sequences after chip placement (not removal)
    if (jackType !== "one-eyed") {
      // Check sequences for the player who just moved (previous currentPlayer)
      const playerWhoMoved = gameState.currentPlayer
      const newSequences = checkForSequences(
        newState.board,
        playerWhoMoved,
      )

      if (newSequences.length > 0) {
        // Mark cells as part of a sequence
        const sequenceCellSet = new Set(
          newSequences.flatMap((s) => s.cells),
        )
        const updatedBoard = newState.board.map((c, i) =>
          sequenceCellSet.has(i) ? { ...c, partOfSequence: true } : c,
        )

        newState = {
          ...newState,
          board: updatedBoard,
          sequences: [
            ...newState.sequences.filter((s) => s.player !== playerWhoMoved),
            ...newSequences,
          ],
        }
      }

      // Check win condition
      const winner = checkWinCondition(newState)
      if (winner !== null) {
        newState = {
          ...newState,
          phase: "won",
          winner,
        }
      }
    }

    // Check for draw
    if (isDraw(newState)) {
      newState = {
        ...newState,
        phase: "draw",
      }
    }

    setGameState(newState)
    setUIState(initialUIState)
  }

  return (
    <main className="relative z-10 flex h-screen flex-col overflow-hidden px-4 pt-16 pb-4 md:px-6">
      <div ref={containerRef} className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden">
        {/* Back navigation + header row */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/goodies"
              className="inline-flex items-center gap-1 text-xs text-[#6272a4] transition-colors hover:text-terminal-cyan"
            >
              <ArrowLeft className="h-3 w-3" />
              back to goodies
            </Link>
            <h1 className="text-lg font-bold text-foreground">
              <span className="text-terminal-cyan">&gt;</span> Sequence
            </h1>
          </div>
          <GameControls onNewGame={handleNewGame} />
        </div>

        {/* Status bar */}
        <StatusBar gameState={gameState} onNewGame={handleNewGame} />

        {/* Error message */}
        {uiState.errorMessage && (
          <div className="mb-2 text-center text-xs text-terminal-red">
            {uiState.errorMessage}
          </div>
        )}

        {/* Main game area: Board + Hands side by side on desktop */}
        <div className="flex min-h-0 flex-1 gap-4">
          {/* Board grid — takes up available space */}
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <div className="w-full max-w-[min(100%,calc(100vh-16rem))]">
              <BoardGrid
                gameState={gameState}
                highlightedCells={uiState.highlightedCells}
                onCellClick={handleCellClick}
              />
            </div>
          </div>

          {/* Player hands — sidebar on desktop */}
          <div className="hidden w-64 shrink-0 overflow-y-auto lg:block">
            <PlayerHand
              gameState={gameState}
              selectedCardIndex={uiState.selectedCardIndex}
              highlightedCells={uiState.highlightedCells}
              onCardSelect={handleCardSelect}
              onDiscardDead={handleDiscardDead}
              onDiscardOneEyedJack={handleDiscardOneEyedJack}
            />
          </div>
        </div>

        {/* Player hands — below board on mobile/tablet */}
        <div className="mt-2 lg:hidden">
          <PlayerHand
            gameState={gameState}
            selectedCardIndex={uiState.selectedCardIndex}
            highlightedCells={uiState.highlightedCells}
            onCardSelect={handleCardSelect}
            onDiscardDead={handleDiscardDead}
            onDiscardOneEyedJack={handleDiscardOneEyedJack}
          />
        </div>
      </div>
    </main>
  )
}
