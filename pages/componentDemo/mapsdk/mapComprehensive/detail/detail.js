// detail.js
var amapFile = require('amap-touchui')
var key = '4216f7d550dc95ef4ac91e3c0ee6a19a'
export default {
  data () {
    return {
      queryData: {},
      textDatas: {}
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.setData({
        queryData: this.$route.query
      })
      var myAmapFun = new amapFile.AMapWX({ key: key })

      myAmapFun.getRegeo({
        location: `${this.$route.query.lng},${this.$route.query.lat}`,
        success: (data) => {
          // 调用成功则将相关数据存储至textData
          this.setData({
            textDatas: {
              name: data[0].regeocodeData.formatted_address,
              address: data[0].name,
              latitude: data[0].latitude,
              longitude: data[0].longitude
            }
          })
        },
        fail: (info) => {
        }
      })
    },
    open () {
      ui.navigateTo({
        url: `/pages/component/shopNavi/shopNavi?lng=${this.$route.query.lng}&lat=${this.$route.query.lat}`
      })
    }
  }
}
