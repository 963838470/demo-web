<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :file-list="uploadlist"
      :on-success="fileUploadSuccess"
      :on-remove="handleRemove"
      :limit="5"
    >
      <i class="el-icon-plus"></i>
      <div v-if="!disabled" slot="file" slot-scope="{ file }">
        <el-image class="el-upload-list__item-thumbnail" :src="file.url" :preview-src-list="filelist" />
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      uploadlist: [
        { name: '第1张图片', url: '1.png' },
        { name: '第2张图片', url: '2.png' }
      ]
    }
  },
  computed: {
    filelist() {
      return this.uploadlist.map(f => f.url)
    }
  },
  methods: {
    handlePictureCardPreview() {},
    handleRemove(file) {
      if (this.uploadlist.length > 0) {
        let newArr = []
        this.uploadlist.map(u => {
          if (u.url != file.url) {
            newArr.push(u)
          }
        })
        this.uploadlist = newArr
      }
    },
    fileUploadSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      this.uploadlist.push(file)
    }
  }
}
</script>

<style scoped></style>
