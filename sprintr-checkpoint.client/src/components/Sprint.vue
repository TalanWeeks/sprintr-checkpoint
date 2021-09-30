<template>
  <div class="Sprint">
    <div class="container-fluid">
      <div class="row shadow rounded my-2 py-3 bg-dark text-light">
        <div class="col-6">
          <h4>
            Sprint Title:
          </h4>
          <span class="text-success">{{ sprint.name }}</span>
        </div>
        <div class="col-6">
          <h4>
            Sprint Created:
          </h4>
          <span class="text-success">{{ sprint.createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
