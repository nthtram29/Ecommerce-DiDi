import React from 'react'

const CommentComponent = (props) => {
  const {dataHref, width} = props
  return (
    <div style={{ width: '1100px',margin: '30px -13px 0', borderTop: '1px solid #ccc'}}>
      <div className="fb-comments" data-href={dataHref} data-width={width} data-numposts="5"></div>

    </div>
  )
}

export default CommentComponent