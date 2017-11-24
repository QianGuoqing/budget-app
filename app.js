var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var Income = function(id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: function(type, des, val) {
      var newItem, ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1
      } else {
        ID = 0
      }

      if (type === 'exp') {
        newItem = new Expense(ID, des, val)
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val)
      }

      data.allItems[type].push(newItem)
      return newItem
    },

    testing: function() {
      
    }
  }

})();

var UIController = (function() {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      }
    },
    
    addListItem: function(obj, type) {
      var html, newHtml, element

      if (type === 'inc') {
        element = DOMStrings.incomeContainer

        html = `<div class="item clearfix" id="income-%id%">
          <div class="item__description">%description%</div>
          <div class="right clearfix">
              <div class="item__value">+ %value%</div>
              <div class="item__delete">
                  <button class="item__delete--btn">
                      <i class="ion-ios-close-outline"></i>
                  </button>
              </div>
          </div>
        </div>`
      } else if (type === 'exp'){
        element = DOMStrings.expensesContainer

        html = `<div class="item clearfix" id="expense-%id%">
            <div class="item__description">%description%</div>
            <div class="right clearfix">
                <div class="item__value">- %value%</div>
                <div class="item__percentage">21%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`
      }

      newHtml = html.replace('%id%', obj.id)
      newHtml = newHtml.replace('%description%', obj.description)
      newHtml = newHtml.replace('%value%', obj.value)

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
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
    var input, newItem
    // 1. 获取输入数据
    input = UICtrl.getInput()

    // 2. 添加item至controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value)

    // 3. 添加item至UI
    UICtrl.addListItem(newItem, input.type)

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
