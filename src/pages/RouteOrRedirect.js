const RouteOrRedirect = (props) => {
    return (
      <div>
        {isMatch(props) ? (
          <Route path={props.path} component={props.component} />
        ) : (
          <>{handleRedirect(props)}</>
        )}
      </div>
    )
  }
  
  const handleRedirect = (props) => {
    return <Redirect to="/">{props.recipeNotFound()}</Redirect>
  }
  
  const isMatch = (props) => {
    const target = props.computedMatch.params.recipeId
    const matched = props.recipes.some((recipe) => {
      return recipe.id === targetRecipe
    })
    return matched
  }