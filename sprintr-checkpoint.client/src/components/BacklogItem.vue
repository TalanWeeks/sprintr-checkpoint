<template>
  <div class="row">
    <div class="col-12">
      <p><b>Name:</b>{{ backlogItem.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backlogItem: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
