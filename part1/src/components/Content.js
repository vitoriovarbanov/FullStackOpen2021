import React from 'react';

const Content = ({ text, count }) => {
  return (
    <tr>
      <td>
        {text} {count}
      </td>
    </tr>
  )
}

export default Content 