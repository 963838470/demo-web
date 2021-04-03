<template>
  <div class="designer-container" ref="designer">
    <div class="properties-panel" ref="properties"></div>
    <div class="btn-group">
      <el-upload class="upload-btn" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadBpmn">
        <el-tooltip effect="dark" content="上传BPMN文件" placement="top">
          <el-button icon="el-icon-upload2" circle></el-button>
        </el-tooltip>
      </el-upload>
      <el-tooltip effect="dark" content="下载BPMN文件" placement="top">
        <el-button @click="downloadBpmn" icon="el-icon-download" circle></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="下载SVG文件" placement="top">
        <el-button @click="downloadSvg" icon="el-icon-picture-outline" circle></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'

import propertiesPanelModule from '@/views/workflow/bpmn/properties-panel'
import propertiesProviderModule from '@/views/workflow/bpmn/properties-panel/provider/activiti'
import activitiModdleDescriptor from '@/views/workflow/resources/activiti.json'
import customTranslate from '@/views/workflow/bpmn/customTranslate/customTranslate'
import customControlsModule from '@/views/workflow/bpmn/customControls'
// bpmn样式
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import '@/views/workflow/style/index.styl'
import { download } from '@/common/util'

export default {
  name: 'ProcessDesign',
  data() {
    return {
      model: null,
      bpmnModeler: null
    }
  },
  watch: {
    model: {
      handler: function(newValue) {
        // 模型变更重新加载
        if (!newValue) {
          newValue =
            '<?xml version="1.0" encoding="utf-8"?><definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:tns="http://www.activiti.org/testm1574124674914" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" expressionLanguage="http://www.w3.org/1999/XPath" id="m1574124674914" name="" targetNamespace="http://www.activiti.org/testm1574124674914" typeLanguage="http://www.w3.org/2001/XMLSchema"><process id="Process_1" isExecutable="true"><startEvent id="StartEvent_1" /></process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"><bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1"><dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></definitions>'
        }
        this.$nextTick(() => {
          this.bpmnModeler.importXML(newValue, error => {
            if (error) {
              console.error(error)
            }
          })
        })
      },
      immediate: true
    }
  },
  methods: {
    init() {},
    uploadBpmn(file) {
      console.log(file)
      const reader = new FileReader()
      reader.readAsText(file.raw)
      reader.onload = event => {
        let data = event.target.result
        this.bpmnModeler.importXML(data, err => {
          if (err) {
            this.$message.info('导入失败')
          }
        })
      }
    },
    downloadSvg() {
      this.bpmnModeler.saveSVG({}, (err, result) => {
        if (err) {
          this.$message.info('下载失败')
        } else {
          download('diagram.svg', result)
        }
      })
    },
    downloadBpmn() {
      this.bpmnModeler.saveXML({ format: true }, (err, result) => {
        if (err) {
          this.$message.info('下载失败')
        } else {
          download('diagram.bpmn', result)
        }
      })
    }
  },
  mounted() {
    var customTranslateModule = {
      translate: ['value', customTranslate]
    }
    this.bpmnModeler = new BpmnModeler({
      container: this.$refs.designer,
      keyboard: {
        bindTo: window
      },
      propertiesPanel: {
        parent: this.$refs.properties
      },
      //添加属性面板，添加翻译
      additionalModules: [propertiesPanelModule, propertiesProviderModule, customTranslateModule, customControlsModule],
      //模块拓展，拓展activiti的描述
      moddleExtensions: {
        activiti: activitiModdleDescriptor
      }
    })
  }
}
</script>

<style scoped>
.designer-container {
  width: 100%;
  height: 80vh;
  position: relative;
}

.btn-group {
  width: 190px;
  position: absolute;
  bottom: 0px;
  z-index: 9;
}

.upload-btn {
  display: inline-block;
  margin-right: 10px;
}
</style>
