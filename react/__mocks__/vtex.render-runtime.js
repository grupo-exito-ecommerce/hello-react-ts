export function withRuntimeContext(MyComponent) {
  return props => {
    return <MyComponent runtime={{ hints: {} }} {...props} />;
  };
}
