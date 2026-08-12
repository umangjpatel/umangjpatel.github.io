import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ArrowLeft, RotateCcw, Bot, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Player = "X" | "O"
type Cell = Player | null
type GameMode = "two-player" | "ai" | null
type Difficulty = "easy" | "hard"

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function checkWinner(board: Cell[]): { winner: Player; line: number[] } | null {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: combo }
    }
  }
  return null
}

function isDraw(board: Cell[]): boolean {
  return board.every((cell) => cell !== null)
}

function minimax(
  board: Cell[],
  isMaximizing: boolean,
  depth: number
): number {
  const result = checkWinner(board)
  if (result?.winner === "O") return 10 - depth
  if (result?.winner === "X") return depth - 10
  if (isDraw(board)) return 0

  if (isMaximizing) {
    let best = -Infinity
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O"
        best = Math.max(best, minimax(board, false, depth + 1))
        board[i] = null
      }
    }
    return best
  } else {
    let best = Infinity
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X"
        best = Math.min(best, minimax(board, true, depth + 1))
        board[i] = null
      }
    }
    return best
  }
}

function getAiMove(board: Cell[], difficulty: Difficulty): number {
  const empty = board
    .map((cell, i) => (cell === null ? i : -1))
    .filter((i) => i !== -1)

  if (empty.length === 0) return -1

  if (difficulty === "easy") {
    // 40% chance of optimal move, otherwise random
    if (Math.random() < 0.4) {
      return getBestMove(board)
    }
    return empty[Math.floor(Math.random() * empty.length)]
  }

  return getBestMove(board)
}

function getBestMove(board: Cell[]): number {
  let bestScore = -Infinity
  let bestMove = -1

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O"
      const score = minimax(board, false, 0)
      board[i] = null
      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    }
  }

  return bestMove
}

export function TicTacToePage() {
  const [mode, setMode] = useState<GameMode>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>("hard")
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")
  const [winner, setWinner] = useState<{
    winner: Player
    line: number[]
  } | null>(null)
  const [draw, setDraw] = useState(false)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      )
    }
  }, [])

  const handleMove = (index: number) => {
    if (board[index] || winner || draw) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result)
      setScores((prev) => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1,
      }))
    } else if (isDraw(newBoard)) {
      setDraw(true)
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  useEffect(() => {
    if (mode === "ai" && currentPlayer === "O" && !winner && !draw) {
      const timeout = setTimeout(() => {
        const move = getAiMove([...board], difficulty)
        if (move !== -1) {
          handleMove(move)
        }
      }, 400)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, mode, winner, draw])

  const handleCellClick = (index: number) => {
    if (mode === "ai" && currentPlayer === "O") return
    handleMove(index)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setDraw(false)
  }

  const resetAll = () => {
    resetGame()
    setScores({ X: 0, O: 0, draws: 0 })
    setMode(null)
  }

  const getStatusText = () => {
    if (winner) {
      const label =
        mode === "ai"
          ? winner.winner === "X"
            ? "You"
            : "AI"
          : `Player ${winner.winner}`
      return `${label} wins!`
    }
    if (draw) return "It's a draw!"
    if (mode === "ai") {
      return currentPlayer === "X" ? "Your turn (X)" : "AI is thinking..."
    }
    return `Player ${currentPlayer}'s turn`
  }

  // Mode selection screen
  if (!mode) {
    return (
      <main className="relative z-10 min-h-screen px-4 pt-24 pb-16 md:px-8">
        <div ref={containerRef} className="mx-auto max-w-2xl">
          <div className="mb-6">
            <Link
              to="/goodies"
              className="inline-flex items-center gap-1 text-xs text-[#6272a4] transition-colors hover:text-terminal-cyan"
            >
              <ArrowLeft className="h-3 w-3" />
              back to goodies
            </Link>
          </div>

          <div className="mb-8">
            <p className="mb-2 text-xs text-[#6272a4]">
              <span className="text-terminal-cyan">$</span> ./tictactoe
              --select-mode
            </p>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              <span className="text-terminal-cyan">&gt;</span> Tic-Tac-Toe
            </h1>
            <p className="mt-3 text-sm text-[#6272a4]">
              // Select a game mode to begin.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => setMode("two-player")}
              className="group rounded-lg border border-[#44475a] bg-[#313342]/60 p-6 text-left transition-all hover:border-terminal-cyan hover:bg-[#313342]"
            >
              <Users className="mb-3 h-8 w-8 text-terminal-cyan transition-transform group-hover:scale-110" />
              <h2 className="mb-1 font-bold text-foreground">Two Players</h2>
              <p className="text-xs text-[#6272a4]">
                Play against a friend locally. Take turns on the same screen.
              </p>
            </button>

            <button
              onClick={() => setMode("ai")}
              className="group rounded-lg border border-[#44475a] bg-[#313342]/60 p-6 text-left transition-all hover:border-terminal-purple hover:bg-[#313342]"
            >
              <Bot className="mb-3 h-8 w-8 text-terminal-purple transition-transform group-hover:scale-110" />
              <h2 className="mb-1 font-bold text-foreground">vs AI</h2>
              <p className="text-xs text-[#6272a4]">
                Challenge the computer. You play as X, AI plays as O.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDifficulty("easy")
                    setMode("ai")
                  }}
                  className="rounded border border-[#44475a] px-2 py-0.5 text-xs text-terminal-green transition-colors hover:border-terminal-green"
                >
                  Easy
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDifficulty("hard")
                    setMode("ai")
                  }}
                  className="rounded border border-[#44475a] px-2 py-0.5 text-xs text-terminal-red transition-colors hover:border-terminal-red"
                >
                  Hard
                </button>
              </div>
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative z-10 min-h-screen px-4 pt-24 pb-16 md:px-8">
      <div ref={containerRef} className="mx-auto max-w-2xl">
        {/* Back link */}
        <div className="mb-6">
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1 text-xs text-[#6272a4] transition-colors hover:text-terminal-cyan"
          >
            <ArrowLeft className="h-3 w-3" />
            back to tictactoe menu
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <p className="mb-2 text-xs text-[#6272a4]">
            <span className="text-terminal-cyan">$</span> ./tictactoe --mode=
            {mode === "ai" ? `ai --difficulty=${difficulty}` : "local"}
          </p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            <span className="text-terminal-cyan">&gt;</span> Tic-Tac-Toe
          </h1>
        </div>

        {/* Scoreboard */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-[#44475a] bg-[#313342]/60 px-4 py-3">
          <div className="flex gap-4 text-xs">
            <span className="text-terminal-cyan">
              {mode === "ai" ? "You" : "X"}: {scores.X}
            </span>
            <span className="text-[#6272a4]">Draws: {scores.draws}</span>
            <span className="text-terminal-purple">
              {mode === "ai" ? "AI" : "O"}: {scores.O}
            </span>
          </div>
          <div className="flex gap-2">
            {mode === "ai" && (
              <Badge
                variant="outline"
                className={
                  difficulty === "easy"
                    ? "text-terminal-green"
                    : "text-terminal-red"
                }
              >
                {difficulty}
              </Badge>
            )}
            <Badge variant="outline">
              {mode === "ai" ? "vs AI" : "2P"}
            </Badge>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4 text-center">
          <p
            className={`text-sm font-medium ${
              winner
                ? "text-terminal-green"
                : draw
                  ? "text-terminal-yellow"
                  : "text-foreground"
            }`}
          >
            {getStatusText()}
          </p>
        </div>

        {/* Game board */}
        <div
          ref={boardRef}
          className="mx-auto mb-6 grid w-fit grid-cols-3 gap-2"
        >
          {board.map((cell, index) => {
            const isWinCell = winner?.line.includes(index)
            return (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={!!cell || !!winner || draw}
                aria-label={`Cell ${index + 1}${cell ? `, marked ${cell}` : ", empty"}`}
                className={`flex h-20 w-20 items-center justify-center rounded-lg border text-3xl font-bold transition-all sm:h-24 sm:w-24 ${
                  isWinCell
                    ? "border-terminal-green bg-terminal-green/10"
                    : cell
                      ? "border-[#44475a] bg-[#313342]/80"
                      : "border-[#44475a] bg-[#313342]/60 hover:border-terminal-cyan hover:bg-[#313342]"
                } disabled:cursor-default`}
              >
                {cell === "X" && (
                  <span className="text-terminal-cyan">X</span>
                )}
                {cell === "O" && (
                  <span className="text-terminal-purple">O</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <button
            onClick={resetGame}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#44475a] bg-[#313342]/60 px-4 py-2 text-xs text-foreground transition-colors hover:border-terminal-cyan hover:bg-[#313342]"
          >
            <RotateCcw className="h-3 w-3" />
            New Round
          </button>
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#44475a] bg-[#313342]/60 px-4 py-2 text-xs text-foreground transition-colors hover:border-terminal-red hover:text-terminal-red"
          >
            Change Mode
          </button>
        </div>
      </div>
    </main>
  )
}
