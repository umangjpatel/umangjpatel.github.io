// ─── Types ───────────────────────────────────────────────────────────────────

export type Suit = "hearts" | "diamonds" | "clubs" | "spades"
export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "Q"
  | "K"
  | "A"
export type JackType = "one-eyed" | "two-eyed"

export interface Card {
  rank: Rank | "J"
  suit: Suit
}

export type CellType = "free" | "card"
export type ChipColor = "cyan" | "purple" | null

export interface BoardCell {
  type: CellType
  card: Card | null
  chip: ChipColor
  partOfSequence: boolean
}

export type Player = 1 | 2
export type GamePhase = "playing" | "won" | "draw"

export interface Sequence {
  cells: number[]
  player: Player
}

export interface GameState {
  board: BoardCell[]
  hands: [Card[], Card[]]
  deck: Card[]
  currentPlayer: Player
  sequences: Sequence[]
  phase: GamePhase
  winner: Player | null
  selectedCard: number | null
}

// ─── Board Layout ────────────────────────────────────────────────────────────

// Standard Sequence board layout (10×10, row-major).
// Corners (indices 0, 9, 90, 99) are free spaces (null).
// Each non-jack card appears exactly twice on the board.

function c(rank: Card["rank"], suit: Suit): Card {
  return { rank, suit }
}

export const BOARD_LAYOUT: (Card | null)[] = [
  // Row 0
  null,
  c("2", "spades"),
  c("3", "spades"),
  c("4", "spades"),
  c("5", "spades"),
  c("6", "spades"),
  c("7", "spades"),
  c("8", "spades"),
  c("9", "spades"),
  null,
  // Row 1
  c("6", "clubs"),
  c("5", "clubs"),
  c("4", "clubs"),
  c("3", "clubs"),
  c("2", "clubs"),
  c("A", "hearts"),
  c("K", "hearts"),
  c("Q", "hearts"),
  c("10", "hearts"),
  c("10", "spades"),
  // Row 2
  c("7", "clubs"),
  c("A", "spades"),
  c("2", "diamonds"),
  c("3", "diamonds"),
  c("4", "diamonds"),
  c("5", "diamonds"),
  c("6", "diamonds"),
  c("7", "diamonds"),
  c("9", "hearts"),
  c("Q", "spades"),
  // Row 3
  c("8", "clubs"),
  c("K", "spades"),
  c("6", "clubs"),
  c("5", "clubs"),
  c("4", "clubs"),
  c("3", "clubs"),
  c("2", "clubs"),
  c("8", "diamonds"),
  c("8", "hearts"),
  c("K", "spades"),
  // Row 4
  c("9", "clubs"),
  c("Q", "spades"),
  c("7", "clubs"),
  c("6", "hearts"),
  c("5", "hearts"),
  c("4", "hearts"),
  c("A", "hearts"),
  c("9", "diamonds"),
  c("7", "hearts"),
  c("A", "spades"),
  // Row 5
  c("10", "clubs"),
  c("10", "spades"),
  c("8", "clubs"),
  c("7", "hearts"),
  c("2", "hearts"),
  c("3", "hearts"),
  c("K", "hearts"),
  c("10", "diamonds"),
  c("6", "hearts"),
  c("2", "diamonds"),
  // Row 6
  c("Q", "clubs"),
  c("9", "spades"),
  c("9", "clubs"),
  c("8", "hearts"),
  c("9", "hearts"),
  c("10", "hearts"),
  c("Q", "hearts"),
  c("Q", "diamonds"),
  c("5", "hearts"),
  c("3", "diamonds"),
  // Row 7
  c("K", "clubs"),
  c("8", "spades"),
  c("10", "clubs"),
  c("Q", "clubs"),
  c("K", "clubs"),
  c("A", "clubs"),
  c("A", "diamonds"),
  c("K", "diamonds"),
  c("4", "hearts"),
  c("4", "diamonds"),
  // Row 8
  c("A", "clubs"),
  c("7", "spades"),
  c("6", "spades"),
  c("5", "spades"),
  c("4", "spades"),
  c("3", "spades"),
  c("2", "spades"),
  c("2", "hearts"),
  c("3", "hearts"),
  c("5", "diamonds"),
  // Row 9
  null,
  c("A", "diamonds"),
  c("K", "diamonds"),
  c("Q", "diamonds"),
  c("10", "diamonds"),
  c("9", "diamonds"),
  c("8", "diamonds"),
  c("7", "diamonds"),
  c("6", "diamonds"),
  null,
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Classify a jack as one-eyed or two-eyed.
 * One-eyed jacks: J♠, J♥ (spades, hearts) — used to remove opponent chips.
 * Two-eyed jacks: J♦, J♣ (diamonds, clubs) — used as wild cards.
 * Returns null if the card is not a jack.
 */
export function getJackType(card: Card): JackType | null {
  if (card.rank !== "J") return null
  return card.suit === "spades" || card.suit === "hearts"
    ? "one-eyed"
    : "two-eyed"
}

// ─── Deck Utilities ──────────────────────────────────────────────────────────

const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"]
const RANKS: (Rank | "J")[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
]

/**
 * Create and return a shuffled 104-card deck (two standard 52-card decks).
 * Uses Fisher-Yates shuffle.
 */
export function shuffleDeck(): Card[] {
  const deck: Card[] = []

  // Two copies of a standard 52-card deck
  for (let copy = 0; copy < 2; copy++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        deck.push({ rank, suit })
      }
    }
  }

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }

  return deck
}

// ─── Game Initialization ─────────────────────────────────────────────────────

const FREE_SPACE_INDICES = [0, 9, 90, 99]

/**
 * Create the initial game state:
 * - Shuffled 104-card deck
 * - 7 cards dealt to each player (from top of deck)
 * - Player 1 active
 * - Board initialized with free-space corners (chip counts for both players)
 */
export function createInitialState(): GameState {
  const deck = shuffleDeck()

  // Deal 7 cards to each player from the top of the deck
  const hand1 = deck.splice(0, 7)
  const hand2 = deck.splice(0, 7)

  // Initialize the board
  const board: BoardCell[] = BOARD_LAYOUT.map((card, index) => {
    const isFreeSpace = FREE_SPACE_INDICES.includes(index)
    return {
      type: isFreeSpace ? "free" : "card",
      card: isFreeSpace ? null : card,
      chip: null,
      partOfSequence: false,
    } satisfies BoardCell
  })

  return {
    board,
    hands: [hand1, hand2],
    deck,
    currentPlayer: 1,
    sequences: [],
    phase: "playing",
    winner: null,
    selectedCard: null,
  }
}

// ─── Result Types ────────────────────────────────────────────────────────────

export type MoveResult =
  | { success: true; state: GameState }
  | { success: false; error: string }

// ─── Move Validation ─────────────────────────────────────────────────────────

/**
 * Check if two cards match (same rank and suit).
 */
function cardsMatch(a: Card, b: Card): boolean {
  return a.rank === b.rank && a.suit === b.suit
}

/**
 * Get the chip color for a player.
 */
function getPlayerChip(player: Player): ChipColor {
  return player === 1 ? "cyan" : "purple"
}

/**
 * Get the opponent player number.
 */
function getOpponent(player: Player): Player {
  return player === 1 ? 2 : 1
}

/**
 * Return cell indices that are valid targets for a given card.
 *
 * - Normal cards: cells where BOARD_LAYOUT matches the card AND cell is empty (up to 2).
 * - Two-eyed jacks: all empty non-free cells.
 * - One-eyed jacks: opponent chips not part of a completed sequence.
 *   Requires currentPlayer context to determine the opponent.
 */
export function getValidCells(
  card: Card,
  board: BoardCell[],
  currentPlayer?: Player,
): number[] {
  const jackType = getJackType(card)

  if (jackType === "two-eyed") {
    // Two-eyed jack: any empty cell that is not a free space
    return board.reduce<number[]>((indices, cell, i) => {
      if (cell.chip === null && cell.type !== "free") {
        indices.push(i)
      }
      return indices
    }, [])
  }

  if (jackType === "one-eyed") {
    // One-eyed jack: opponent chips not part of a completed sequence
    const opponentChip = currentPlayer
      ? getPlayerChip(getOpponent(currentPlayer))
      : null
    return board.reduce<number[]>((indices, cell, i) => {
      if (
        cell.chip !== null &&
        cell.chip === opponentChip &&
        !cell.partOfSequence
      ) {
        indices.push(i)
      }
      return indices
    }, [])
  }

  // Normal card: find cells where layout matches AND cell is empty
  return board.reduce<number[]>((indices, cell, i) => {
    const layoutCard = BOARD_LAYOUT[i]
    if (layoutCard && cardsMatch(layoutCard, card) && cell.chip === null) {
      indices.push(i)
    }
    return indices
  }, [])
}

// ─── Core Move Functions ─────────────────────────────────────────────────────

/**
 * Place a chip on the board for a normal (non-jack) card play.
 *
 * Validates:
 * - cardIndex is valid
 * - Game is in "playing" phase
 * - Cell matches the card on the board layout
 * - Cell is not already occupied
 *
 * On success: places chip, removes card from hand, draws from deck, switches turn.
 */
export function placeChip(
  state: GameState,
  cardIndex: number,
  cellIndex: number,
): MoveResult {
  // Validate game phase
  if (state.phase !== "playing") {
    return { success: false, error: "Game is not in progress." }
  }

  const hand = state.hands[state.currentPlayer - 1]

  // Validate card selection
  if (cardIndex < 0 || cardIndex >= hand.length) {
    return { success: false, error: "Please select a card first." }
  }

  const card = hand[cardIndex]

  // Reject jack cards from normal placement
  if (card.rank === "J") {
    return { success: false, error: "Jacks must use special play functions." }
  }

  // Validate cell is on the board
  if (cellIndex < 0 || cellIndex >= 100) {
    return { success: false, error: "Invalid cell." }
  }

  const cell = state.board[cellIndex]

  // Validate cell is not occupied
  if (cell.chip !== null) {
    return { success: false, error: "Cell is already occupied." }
  }

  // Validate cell matches the card
  const layoutCard = BOARD_LAYOUT[cellIndex]
  if (!layoutCard || !cardsMatch(layoutCard, card)) {
    return { success: false, error: "Cell does not match the selected card." }
  }

  // Create new state with immutable updates
  const newBoard = state.board.map((c, i) =>
    i === cellIndex
      ? { ...c, chip: getPlayerChip(state.currentPlayer) }
      : c,
  )

  const newHand = hand.filter((_, i) => i !== cardIndex)
  const newHands: [Card[], Card[]] =
    state.currentPlayer === 1
      ? [newHand, [...state.hands[1]]]
      : [[...state.hands[0]], newHand]

  // Draw from deck if available
  const newDeck = [...state.deck]
  if (newDeck.length > 0) {
    const drawn = newDeck.shift()!
    if (state.currentPlayer === 1) {
      newHands[0] = [...newHands[0], drawn]
    } else {
      newHands[1] = [...newHands[1], drawn]
    }
  }

  const nextPlayer: Player = state.currentPlayer === 1 ? 2 : 1

  return {
    success: true,
    state: {
      ...state,
      board: newBoard,
      hands: newHands,
      deck: newDeck,
      currentPlayer: nextPlayer,
      selectedCard: null,
    },
  }
}

/**
 * Remove an opponent's chip using a one-eyed jack.
 *
 * Validates:
 * - cardIndex is valid and card is a one-eyed jack
 * - Target cell has an opponent chip
 * - Target chip is not part of a completed sequence
 *
 * If no removable targets exist: discards the jack, draws replacement, ends turn (Req 4.4).
 * On success: removes opponent chip, discards jack, draws from deck, switches turn.
 */
export function removeChip(
  state: GameState,
  cardIndex: number,
  cellIndex: number,
): MoveResult {
  // Validate game phase
  if (state.phase !== "playing") {
    return { success: false, error: "Game is not in progress." }
  }

  const hand = state.hands[state.currentPlayer - 1]

  // Validate card selection
  if (cardIndex < 0 || cardIndex >= hand.length) {
    return { success: false, error: "Please select a card first." }
  }

  const card = hand[cardIndex]

  // Validate card is a one-eyed jack
  if (getJackType(card) !== "one-eyed") {
    return { success: false, error: "Only one-eyed jacks can remove chips." }
  }

  // Validate cell is on the board
  if (cellIndex < 0 || cellIndex >= 100) {
    return { success: false, error: "Invalid cell." }
  }

  const cell = state.board[cellIndex]
  const opponentChip = getPlayerChip(getOpponent(state.currentPlayer))

  // Validate cell has opponent chip
  if (cell.chip !== opponentChip) {
    return {
      success: false,
      error: "Target cell does not have an opponent chip.",
    }
  }

  // Validate chip is not part of a completed sequence (Req 4.3)
  if (cell.partOfSequence) {
    return {
      success: false,
      error:
        "Cannot remove a chip that is part of a completed sequence.",
    }
  }

  // Remove the opponent's chip
  const newBoard = state.board.map((c, i) =>
    i === cellIndex ? { ...c, chip: null as ChipColor } : c,
  )

  // Remove card from hand
  const newHand = hand.filter((_, i) => i !== cardIndex)
  const newHands: [Card[], Card[]] =
    state.currentPlayer === 1
      ? [newHand, [...state.hands[1]]]
      : [[...state.hands[0]], newHand]

  // Draw from deck if available
  const newDeck = [...state.deck]
  if (newDeck.length > 0) {
    const drawn = newDeck.shift()!
    if (state.currentPlayer === 1) {
      newHands[0] = [...newHands[0], drawn]
    } else {
      newHands[1] = [...newHands[1], drawn]
    }
  }

  const nextPlayer: Player = state.currentPlayer === 1 ? 2 : 1

  return {
    success: true,
    state: {
      ...state,
      board: newBoard,
      hands: newHands,
      deck: newDeck,
      currentPlayer: nextPlayer,
      selectedCard: null,
    },
  }
}

/**
 * Play a two-eyed jack as a wild card to place a chip on any empty non-free cell.
 *
 * Validates:
 * - cardIndex is valid and card is a two-eyed jack
 * - Target cell is empty and not a free space
 *
 * On success: places chip, discards jack, draws from deck, switches turn.
 */
export function playTwoEyedJack(
  state: GameState,
  cardIndex: number,
  cellIndex: number,
): MoveResult {
  // Validate game phase
  if (state.phase !== "playing") {
    return { success: false, error: "Game is not in progress." }
  }

  const hand = state.hands[state.currentPlayer - 1]

  // Validate card selection
  if (cardIndex < 0 || cardIndex >= hand.length) {
    return { success: false, error: "Please select a card first." }
  }

  const card = hand[cardIndex]

  // Validate card is a two-eyed jack
  if (getJackType(card) !== "two-eyed") {
    return {
      success: false,
      error: "Only two-eyed jacks can be used as wild cards.",
    }
  }

  // Validate cell is on the board
  if (cellIndex < 0 || cellIndex >= 100) {
    return { success: false, error: "Invalid cell." }
  }

  const cell = state.board[cellIndex]

  // Validate cell is not a free space
  if (cell.type === "free") {
    return { success: false, error: "Cannot place a chip on a free space." }
  }

  // Validate cell is empty
  if (cell.chip !== null) {
    return { success: false, error: "Cell is already occupied." }
  }

  // Place the chip
  const newBoard = state.board.map((c, i) =>
    i === cellIndex
      ? { ...c, chip: getPlayerChip(state.currentPlayer) }
      : c,
  )

  // Remove card from hand
  const newHand = hand.filter((_, i) => i !== cardIndex)
  const newHands: [Card[], Card[]] =
    state.currentPlayer === 1
      ? [newHand, [...state.hands[1]]]
      : [[...state.hands[0]], newHand]

  // Draw from deck if available
  const newDeck = [...state.deck]
  if (newDeck.length > 0) {
    const drawn = newDeck.shift()!
    if (state.currentPlayer === 1) {
      newHands[0] = [...newHands[0], drawn]
    } else {
      newHands[1] = [...newHands[1], drawn]
    }
  }

  const nextPlayer: Player = state.currentPlayer === 1 ? 2 : 1

  return {
    success: true,
    state: {
      ...state,
      board: newBoard,
      hands: newHands,
      deck: newDeck,
      currentPlayer: nextPlayer,
      selectedCard: null,
    },
  }
}

/**
 * Handle the case where a one-eyed jack has no removable targets (Req 4.4).
 * Discards the jack, draws a replacement if deck has cards, and ends the turn.
 */
export function discardOneEyedJackNoTargets(
  state: GameState,
  cardIndex: number,
): MoveResult {
  // Validate game phase
  if (state.phase !== "playing") {
    return { success: false, error: "Game is not in progress." }
  }

  const hand = state.hands[state.currentPlayer - 1]

  // Validate card selection
  if (cardIndex < 0 || cardIndex >= hand.length) {
    return { success: false, error: "Please select a card first." }
  }

  const card = hand[cardIndex]

  // Validate card is a one-eyed jack
  if (getJackType(card) !== "one-eyed") {
    return { success: false, error: "Only one-eyed jacks can use this action." }
  }

  // Check that there are indeed no removable targets
  const validTargets = getValidCells(card, state.board, state.currentPlayer)
  if (validTargets.length > 0) {
    return {
      success: false,
      error: "There are removable targets available. Select a target cell.",
    }
  }

  // Remove card from hand
  const newHand = hand.filter((_, i) => i !== cardIndex)
  const newHands: [Card[], Card[]] =
    state.currentPlayer === 1
      ? [newHand, [...state.hands[1]]]
      : [[...state.hands[0]], newHand]

  // Draw from deck if available
  const newDeck = [...state.deck]
  if (newDeck.length > 0) {
    const drawn = newDeck.shift()!
    if (state.currentPlayer === 1) {
      newHands[0] = [...newHands[0], drawn]
    } else {
      newHands[1] = [...newHands[1], drawn]
    }
  }

  const nextPlayer: Player = state.currentPlayer === 1 ? 2 : 1

  return {
    success: true,
    state: {
      ...state,
      hands: newHands,
      deck: newDeck,
      currentPlayer: nextPlayer,
      selectedCard: null,
    },
  }
}

// ─── Sequence Detection & Win Condition ──────────────────────────────────────

/**
 * Check for completed sequences of exactly 5 chips in a row for a given player.
 *
 * Scans horizontal, vertical, and both diagonal directions.
 * Free-space corners (indices 0, 9, 90, 99) count as chips for BOTH players.
 * A line of 6+ does NOT count as a single sequence — only exactly 5 consecutive.
 *
 * Returns an array of Sequence objects with `cells` and `player`.
 */
export function checkForSequences(board: BoardCell[], player: Player): Sequence[] {
  const chipColor = getPlayerChip(player)
  const sequences: Sequence[] = []

  // Helper: does a cell count as belonging to this player?
  function cellBelongsToPlayer(index: number): boolean {
    const cell = board[index]
    // Free spaces count for both players
    if (cell.type === "free") return true
    return cell.chip === chipColor
  }

  // Convert (row, col) to flat index
  function toIndex(row: number, col: number): number {
    return row * 10 + col
  }

  // Directions: [dRow, dCol]
  const directions: [number, number][] = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal down-right
    [1, -1],  // diagonal down-left
  ]

  for (const [dRow, dCol] of directions) {
    // Determine valid starting points for each direction
    const maxRow = dRow === 0 ? 9 : (10 - 5 * dRow)
    const minCol = dCol === -1 ? 4 : 0
    const maxCol = dCol === 1 ? 5 : (dCol === 0 ? 9 : 9)

    for (let row = 0; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        // Check if exactly 5 cells in this direction belong to the player
        const cells: number[] = []
        let valid = true

        for (let step = 0; step < 5; step++) {
          const r = row + step * dRow
          const c = col + step * dCol

          if (r < 0 || r > 9 || c < 0 || c > 9) {
            valid = false
            break
          }

          const idx = toIndex(r, c)
          if (!cellBelongsToPlayer(idx)) {
            valid = false
            break
          }
          cells.push(idx)
        }

        if (!valid || cells.length !== 5) continue

        // Ensure it's EXACTLY 5: check that the cells before and after (if they exist)
        // do NOT belong to this player (otherwise it's part of a longer line, not exactly 5)
        const beforeRow = row - dRow
        const beforeCol = col - dCol
        if (
          beforeRow >= 0 && beforeRow <= 9 &&
          beforeCol >= 0 && beforeCol <= 9 &&
          cellBelongsToPlayer(toIndex(beforeRow, beforeCol))
        ) {
          continue
        }

        const afterRow = row + 5 * dRow
        const afterCol = col + 5 * dCol
        if (
          afterRow >= 0 && afterRow <= 9 &&
          afterCol >= 0 && afterCol <= 9 &&
          cellBelongsToPlayer(toIndex(afterRow, afterCol))
        ) {
          continue
        }

        sequences.push({ cells, player })
      }
    }
  }

  return sequences
}

/**
 * Check if a player has won (2+ valid sequences that share at most one chip each).
 *
 * Two different sequences may share at most one chip between them (Req 5.6).
 * Uses a greedy approach: find all sequences for each player, then check if
 * at least 2 can coexist with the sharing constraint.
 *
 * Returns the winning Player or null.
 */
export function checkWinCondition(state: GameState): Player | null {
  for (const player of [1, 2] as Player[]) {
    const sequences = checkForSequences(state.board, player)
    if (sequences.length < 2) continue

    // Check if any pair of sequences shares at most one chip
    if (hasValidSequencePair(sequences)) {
      return player
    }
  }
  return null
}

/**
 * Check if there exists at least 2 sequences that share at most 1 cell.
 */
function hasValidSequencePair(sequences: Sequence[]): boolean {
  for (let i = 0; i < sequences.length; i++) {
    for (let j = i + 1; j < sequences.length; j++) {
      const shared = sequences[i].cells.filter((cell) =>
        sequences[j].cells.includes(cell),
      )
      if (shared.length <= 1) {
        return true
      }
    }
  }
  return false
}

// ─── Dead Card Handling ──────────────────────────────────────────────────────

/**
 * Check if a card is a dead card.
 *
 * A card is dead when BOTH board positions matching that card are occupied by chips.
 * Jacks are never dead cards (they always have potential targets or can be discarded via
 * discardOneEyedJackNoTargets).
 */
export function isDeadCard(card: Card, board: BoardCell[]): boolean {
  // Jacks are never dead cards
  if (card.rank === "J") return false

  // Find both positions for this card on the board
  const matchingPositions: number[] = []
  for (let i = 0; i < BOARD_LAYOUT.length; i++) {
    const layoutCard = BOARD_LAYOUT[i]
    if (layoutCard && cardsMatch(layoutCard, card)) {
      matchingPositions.push(i)
    }
  }

  // A card is dead only when BOTH positions are occupied
  if (matchingPositions.length < 2) return false

  return matchingPositions.every((idx) => board[idx].chip !== null)
}

/**
 * Discard a dead card from the current player's hand, draw a replacement if deck
 * has cards, and end the turn.
 *
 * Counts as the player's turn (Req 6.2).
 * If the deck is empty, the discard completes without a replacement (Req 6.4).
 */
export function discardDeadCard(
  state: GameState,
  cardIndex: number,
): MoveResult {
  // Validate game phase
  if (state.phase !== "playing") {
    return { success: false, error: "Game is not in progress." }
  }

  const hand = state.hands[state.currentPlayer - 1]

  // Validate card index
  if (cardIndex < 0 || cardIndex >= hand.length) {
    return { success: false, error: "Invalid card index." }
  }

  const card = hand[cardIndex]

  // Validate the card is actually dead
  if (!isDeadCard(card, state.board)) {
    return { success: false, error: "Card is not a dead card." }
  }

  // Remove card from hand
  const newHand = hand.filter((_, i) => i !== cardIndex)
  const newHands: [Card[], Card[]] =
    state.currentPlayer === 1
      ? [newHand, [...state.hands[1]]]
      : [[...state.hands[0]], newHand]

  // Draw from deck if available
  const newDeck = [...state.deck]
  if (newDeck.length > 0) {
    const drawn = newDeck.shift()!
    if (state.currentPlayer === 1) {
      newHands[0] = [...newHands[0], drawn]
    } else {
      newHands[1] = [...newHands[1], drawn]
    }
  }

  const nextPlayer: Player = state.currentPlayer === 1 ? 2 : 1

  return {
    success: true,
    state: {
      ...state,
      hands: newHands,
      deck: newDeck,
      currentPlayer: nextPlayer,
      selectedCard: null,
    },
  }
}

// ─── Draw Detection ──────────────────────────────────────────────────────────

/**
 * Check if the game is a draw.
 *
 * A draw occurs when:
 * - Both players have zero cards in hand
 * - The deck is empty
 * - No winner has been declared
 */
export function isDraw(state: GameState): boolean {
  if (state.winner !== null) return false
  if (state.phase === "won") return false

  const hand1Empty = state.hands[0].length === 0
  const hand2Empty = state.hands[1].length === 0
  const deckEmpty = state.deck.length === 0

  return hand1Empty && hand2Empty && deckEmpty
}
