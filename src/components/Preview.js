import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Remark from 'remark'
import RemarkMath from 'remark-math'
import RemarkHtmlKatex from 'remark-html-katex'
import RemarkHtml from 'remark-html'
import Doc from './Doc'
import './Preview.css'
import 'katex/dist/katex.css'

const markdown = Remark()
  .use(RemarkHtml)

const markdownMath = Remark()
  .use(RemarkMath)
  .use(RemarkHtmlKatex)
  .use(RemarkHtml)

export default class Preview extends Component {
  constructor (props) {
    super(props)
    this.state = { html: '' }
  }

  componentWillMount () {
    const { md } = this.props
    if (!md) return
    this.convert(md)
  }

  componentWillReceiveProps (nextProps) {
    this.convert(nextProps.md)
  }

  // TODO: debounce?
  convert (md) {
    let processor
    if (this.props.type === 'math') {
      processor = markdownMath
    } else {
      processor = markdown
    }
    processor.process(md, (err, html) => {
      if (err) return console.error('Failed to convert markdown to HTML', err)
      this.setState({ html })
    })
  }

  render () {
    return <Doc className='Doc Preview' html={this.state.html} />
  }
}

Preview.propTypes = {
  md: PropTypes.string.isRequired
}
