import {isUndefined, isArray} from 'lodash'

const executeGuards = (guards, to, from, next) => {
  const guardsLeft = guards.slice(0)
  const nextGuard = guardsLeft.shift()
  if (isUndefined(nextGuard)) {
    next()
    return
  }
  nextGuard(to, from, (nextArg) => {
    if (isUndefined(nextArg)) {
      executeGuards(guardsLeft, to, from, next)
      return
    }
    next(nextArg)
  })
}

export const ResolveGuard = (guards) => {
  if (!isArray(guards)) {
    throw new Error('Guards must be an array')
  }
  return (to, from, next) => {
    return executeGuards(guards, to, from, next)
  }
}
