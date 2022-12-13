import GameScreen from "../screens";
import { QueryClient, QueryClientProvider } from "react-query";
import { GameContextProvider } from "../context/game.context";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GameContextProvider>
        <GameScreen />
      </GameContextProvider>
    </QueryClientProvider>
  );
}

export default App;
