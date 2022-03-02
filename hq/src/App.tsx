import React from "react";
import { Comics } from "./services";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState<Record<string, string[]>>({});
  const [recipes, setRecipes] = React.useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const enabledRecipes = React.useMemo<string[]>(() => {
    return Object.keys(recipes).filter((key) => recipes[key]);
  }, [recipes]);

  const toggleRecipe = React.useCallback((recipe: string) => {
    setRecipes((currentRecipes) => {
      return {
        ...currentRecipes,
        [recipe]: !currentRecipes[recipe],
      };
    });
  }, []);

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
        const recipeObj: Record<string, boolean> = resp.reduce((acc, cv) => {
          return { ...acc, [cv]: true };
        }, {});

        setRecipes(recipeObj);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getRecipes]);

  React.useEffect(() => {
    if (enabledRecipes.length) {
      enabledRecipes.forEach((recipe) =>
        getRecipe(recipe, page)
          .then((response) => {
            const result = response.data.results;
            setData((currentData) => {
              return {
                ...currentData,
                [recipe]: Array.from(
                  new Set([...(currentData[recipe] || []), ...result])
                ),
              };
            });
          })
          .catch((e) => {
            console.error(e);
          })
      );
    }
  }, [enabledRecipes, getRecipe, page]);

  const canNext = React.useMemo(() => {
    return true;
  }, []);

  const getComics = React.useCallback(() => {
    return enabledRecipes
      .map((recipeName) => {
        const recipe = data[recipeName];
        return recipe;
      })
      .flat()
      .map((imgSrc) => (
        <img key={imgSrc} src={imgSrc} className="Comic" alt="comic" />
      ));
  }, [data, enabledRecipes]);

  const getNext = React.useCallback(() => {
    if (canNext) {
      setData({});
      setPage((currentPage) => currentPage + 1);
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
      <div className="Header">
        <h3 className="title">Tiras Disponíveis</h3>

        <div className="Navigation">
          {Object.entries(recipes).map(([key, value]) => {
            return (
              <label className="ComicSelector" htmlFor={key}>
                {key}
                <input
                  key={key}
                  type="checkbox"
                  id={key}
                  name={key}
                  checked={value}
                  onClick={() => toggleRecipe(key)}
                ></input>
              </label>
            );
          })}
        </div>
      </div>
      <div className="Container">
        {getComics()}

        <div className="nav-buttons">
          <button disabled={!canNext} onClick={getNext}>
            Carregar Mais
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
