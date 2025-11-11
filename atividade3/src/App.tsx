import { Attempt } from './components/Attempt';
import { Header } from './components/Header';
import { Tip } from './components/Tip';
import { Word } from './components/Word';
import { Lyrics } from './components/Lyrics';
import { GameMessage } from './components/GameMessage';
import { useGame } from './hooks/useGame';
import { TIPS, GAME_CONFIG } from './services/words';
import './css/App.css';

export const App = () => {
  const {
    targetWord,
    guessedLetters,
    attempts,
    correctLetters,
    wrongLetters,
    hasWon,
    hasLost,
    handleGuess,
    resetGame
  } = useGame();

  return (
    <div className='app'>
      <Header />
      <Attempt
        attempts={attempts}
        maxAttempts={GAME_CONFIG.MAX_ATTEMPTS}
        onReset={resetGame}
      />
      <Tip tip={TIPS[targetWord] || GAME_CONFIG.DEFAULT_TIP} />
      <Word
        word={targetWord}
        guessedLetters={correctLetters}
        hasWon={hasWon}
        hasLost={hasLost}
      />
      <Lyrics
        guessedLetters={guessedLetters}
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        onGuess={handleGuess}
        disabled={hasWon || hasLost}
      />
      {hasWon && <GameMessage type="win" />}
      {hasLost && <GameMessage type="lose" word={targetWord} />}
    </div>
  );
};

export default App;
