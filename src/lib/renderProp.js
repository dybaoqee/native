export default function renderComponentOrFunction(Component, props = {}) {
  if (Component.prototype && Component.prototype.isReactComponent)
    return <Component {...props} />
  else if (typeof Component === 'function') return Component(props)
  else return Component
}
