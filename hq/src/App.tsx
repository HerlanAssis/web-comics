import React from "react";
import { Comics } from "./services";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState<string[]>([]);
  const [recipes, setRecipes] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const getRecipes = React.useCallback(async () => {
    const { data } = await Comics.get<string[]>("");
    return data;
  }, []);

  const getRecipe = React.useCallback(
    async (recipeName: string, recipePage: number) => {
      return await Comics.get<{
        title: string;
        results: string[];
      }>(`${recipeName}/${recipePage}`);
    },
    []
  );

  React.useEffect(() => {
    setIsLoading(true);
    getRecipes()
      .then((resp) => {
        setRecipes(resp);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getRecipes]);

  React.useEffect(() => {
    setIsLoading(true);

    if (recipes.length) {
      const promises = recipes.map((recipe) => getRecipe(recipe, page));

      setIsLoading(true);
      promises.forEach((promise) => {
        promise
          .then((response) => {
            const result = response.data.results;
            setData((currentData) => {
              return Array.from(new Set([...currentData, ...result]));
            });
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    }
  }, [getRecipe, page, recipes]);

  const canNext = React.useMemo(() => {
    return true;
  }, []);

  const getNext = React.useCallback(() => {
    if (canNext) {
      setPage((currentPage) => currentPage++);
    }
  }, [canNext]);

  if (isLoading) {
    return (
      <div className="App-logo-container">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }

  return (
    <div className="App">
      {data.map((imgSrc) => (
        <img key={imgSrc} src={imgSrc} className="Comic" alt="comic" />
      ))}

      <div className="nav-buttons">
        <button disabled={!canNext} onClick={getNext}>
          Carregar Mais
        </button>
      </div>
    </div>
  );
}

export default App;
