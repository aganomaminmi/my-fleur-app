import {
  actions,
  action,
  reducerStore,
  operations,
  selector,
} from '@fleur/fleur'

export const SampleActions = actions('Counter', {
  increment: action<{ amount: number }>(),
  accessDateSettled: action<{ date: Date }>(),
  nameUpdate: action<{ name: string }>(),
})

export const SampleOps = operations({
  increment(context) {
    context.dispatch(SampleActions.increment, { amount: 1 })
  },
  async asyncIncrement(context, amount: number) {
    await new Promise(resolve => {
      setTimeout(resolve, 1000)
    })

    context.dispatch(SampleActions.increment, { amount })
  },
  settleAccessDate(context) {
    context.dispatch(SampleActions.accessDateSettled, { date: new Date() })
  },
  nameUpdate(context, name: string) {
    context.dispatch(SampleActions.nameUpdate, { name })
  },
})

interface SampleState {
  count: number
  accessDate: Date | null
  name: string
}

export const SampleStore = reducerStore<SampleState>('SampleStore', () => ({
  count: 0,
  accessDate: null,
  name: 'sample name.'
}))
  .listen(SampleActions.increment, (draft, { amount }) => (draft.count += amount))
  .listen(
    SampleActions.accessDateSettled,
    (draft, { date }) => (draft.accessDate = date),
  )
  .listen(
    SampleActions.nameUpdate, (draft, { name }) => (draft.name = name),
  )

export const SampleSelectors = {
  getCount: selector(getState => getState(SampleStore).count),
  getAccessDate: selector(getState => getState(SampleStore).accessDate),
  getName: selector(getState => getState(SampleStore).name),
}
