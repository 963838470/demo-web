export default class CustomContextPad {
  constructor(config, contextPad, create, elementFactory, injector, translate) {
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate
    // 自动摆放位置
    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false)
    }
    // 注册工具
    contextPad.registerProvider(this)
  }
  getContextPadEntries(element) {
    const { autoPlace, create, elementFactory, translate } = this

    function appendUserTask(event, element) {
      // 若会产生异常，则元素不会自动生成位置
      var errorCase = false
      if (element.type == 'bpmn:Participant') {
        errorCase = true
      }
      if (!element.x) {
        errorCase = true
      }
      if (autoPlace && !errorCase) {
        const shape = elementFactory.createShape({ type: 'bpmn:UserTask' })
        autoPlace.append(element, shape)
      } else {
        appendUserTaskStart(event)
      }
    }

    function appendUserTaskStart(event) {
      const shape = elementFactory.createShape({ type: 'bpmn:UserTask' })
      create.start(event, shape, element)
    }

    return {
      'append.user-task': {
        group: 'model',
        className: 'bpmn-icon-user-task',
        title: translate('Append ServiceTask'),
        action: {
          click: appendUserTask,
          dragstart: appendUserTaskStart,
          push: () => {}
        },
        push: () => {}
      }
    }
  }
}
CustomContextPad.$inject = [
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
]
