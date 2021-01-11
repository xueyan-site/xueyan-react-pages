import React from 'react'
import Markdown from 'xueyan-react-markdown'
import readme from '../../../README.md'

export default function Readme() {
  return (
    <Markdown>{readme}</Markdown>
  )
}
