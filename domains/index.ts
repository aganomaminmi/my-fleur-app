import Fleur from '@fleur/fleur'
import { AppStore } from './App'
import {SampleStore} from './sample/sample'

const app = new Fleur({
  stores: [
      AppStore,
      SampleStore,
  ],
})

export const createContext = () => app.createContext()
