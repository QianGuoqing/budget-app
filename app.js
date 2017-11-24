var budgetController = (function() {
  
})();

var UIController = (function() {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      }
    },

    getDomStrings: function() {
      return DOMStrings
    }
  }
})();

var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDomStrings()

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem()
      }
    })
  }

  var ctrlAddItem = function() {
    // 1. 获取输入数据
    var input = UICtrl.getInput()
    console.log(input)

    // 2. 添加item至controller

    // 3. 添加item至UI

    // 4. 计算数据

    // 5. UI上展现
  }

  return {
    init: function() {
      setupEventListeners()
    }
  }

})(budgetController, UIController);

controller.init()
