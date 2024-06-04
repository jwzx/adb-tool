import { createFromIconfontCN } from '@ant-design/icons-vue'
import { h } from 'vue'

const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/c/font_4572308_zp8zgut7c2c.js?',
  extraCommonProps: {
    type: 'icon-fengche',
    style: {
      fontSize: '18px',
    },
  },
})

const DynamicIconFont = props => {
  return h(IconFont, { type: props.type || 'icon-fengche' })
}

export default DynamicIconFont
