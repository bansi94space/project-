<template>
  <div>
  <h2>Unsorted Array: {{ unSortedArray }}</h2>
    <h4>{{ message }}</h4>
  </div>
</template>

<script>
export default {
  data () {
    return {
      unSortedArray: [2, 1, 7, 3, 8, 9, 4, 3],
      message: ''
    }
  },
  created () {
    this.findSecondLargest()
  },
  methods: {
    findSecondLargest () {
      let firstMax = -Infinity
      let secondMax = -Infinity

      for (let i = 0; i < this.unSortedArray.length; i++) {
        if (this.unSortedArray[i] > firstMax) {
          secondMax = firstMax
          firstMax = this.unSortedArray[i]
        } else if (
          this.unSortedArray[i] > secondMax &&
          this.unSortedArray[i] !== firstMax
        ) {
          secondMax = this.unSortedArray[i]
        }
      }

      this.message = `${secondMax} is the second largest value in the array.`
    }
  }
}
</script>
