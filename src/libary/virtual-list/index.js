/**
 * https://juejin.cn/post/6844903577631227912#heading-3
 */

const createData = function () {
  let result = [];
  for (let i = 0; i < 10000; i++) {
    result.push({
      value: i,
    });
  }
  return result;
};

const app = Vue.createApp({
  data() {
    return {
      visibleData: [],
      itemHeight: 30,
      data: createData(),
    };
  },
  mounted() {
    this.updateVisibleData();
  },
  computed: {
    contentHeight() {
      const { data, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        total += itemSizeGetter.call(null, data[i], i);
      }
      return total + "px";
    },
  },
  methods: {
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      const start = this.findNearestItemIndex(scrollTop);
      const end = this.findNearestItemIndex(scrollTop + this.$el.clientHeight);
      this.visibleData = this.data.slice(
        start,
        Math.min(end + 1, this.data.length)
      );
      this.$refs.content.style.webkitTransform = `translate3d(0, ${
        this.getItemSizeAndOffset(start).offset
      }px, 0)`;
    },

    handleScroll() {
      const scrollTop = this.$el.scrollTop;
      this.updateVisibleData(scrollTop);
    },
    itemSizeGetter(data, i) {
      return i + Math.round(Math.random() * 50);
    },
    findNearestItemIndex(scrollTop) {
      const { data, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        const size = itemSizeGetter.call(null, data[i], i);
        total += size;
        if (total >= scrollTop || i === j - 1) {
          return i;
        }
      }

      return 0;
    },
    getItemSizeAndOffset(index) {
      const { data, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = Math.min(index, data.length - 1); i <= j; i++) {
        const size = itemSizeGetter.call(null, data[i], i);
        if (i === j) {
          return {
            offset: total,
            size,
          };
        }
        total += size;
      }

      return {
        offset: 0,
        size: 0,
      };
    },
  },
});
app.mount("#app");
