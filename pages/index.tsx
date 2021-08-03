import React, { useEffect } from 'react'
import { useStore, useFleurContext } from '@fleur/react'
import { FleurishNextPageContext } from '@fleur/next'
import { NextPage } from 'next'
import { AppSelectors, AppOps } from '../domains/App'
import {SampleSelectors} from "../domains/sample/sample";

const Index: NextPage = ({}) => {
  const { executeOperation } = useFleurContext()

  const { count, accessDate } = useStore(getStore => ({
    count: AppSelectors.getCount(getStore),
    accessDate: AppSelectors.getAccessDate(getStore),
  }))

  const { name } = useStore(getStore => ({
    name: SampleSelectors.getName(getStore),
  }))

  useEffect(() => {
    const intervalId = setInterval(() => {
      executeOperation(AppOps.increment)
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      Count: {count}
      <br />
      Access date: {accessDate.toLocaleDateString()}
      <br />
      Name: {name}
    </div>
  )
}

Index.getInitialProps = async (ctx: FleurishNextPageContext) => {
  await Promise.all([
    ctx.executeOperation(AppOps.asyncIncrement, (Math.random() * 1000) | 0),
    ctx.executeOperation(AppOps.settleAccessDate),
  ])

  return {}
}

export default Index
