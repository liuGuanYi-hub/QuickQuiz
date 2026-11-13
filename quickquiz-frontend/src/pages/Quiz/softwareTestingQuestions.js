export const SOFTWARE_TESTING_QUESTION_TYPES = {
  "SINGLE_CHOICE": "SINGLE_CHOICE",
  "MULTIPLE_CHOICE": "MULTIPLE_CHOICE",
  "TRUE_FALSE": "TRUE_FALSE",
  "FILL_BLANK": "FILL_BLANK",
  "SUBJECTIVE": "SUBJECTIVE"
};

export const SOFTWARE_TESTING_TYPE_LABELS = {
  "SINGLE_CHOICE": "单选题",
  "MULTIPLE_CHOICE": "多选题",
  "TRUE_FALSE": "判断题",
  "FILL_BLANK": "填空题",
  "SUBJECTIVE": "简答题"
};

const SOFTWARE_TESTING_SET_DEFINITIONS = [
  {
    "setId": "practice-1",
    "title": "软件测试练习 1",
    "order": 1
  },
  {
    "setId": "practice-2",
    "title": "软件测试练习 2",
    "order": 2
  },
  {
    "setId": "practice-3",
    "title": "软件测试练习 3",
    "order": 3
  },
  {
    "setId": "practice-4",
    "title": "软件测试练习 4",
    "order": 4
  },
  {
    "setId": "practice-5",
    "title": "软件测试练习 5",
    "order": 5
  },
  {
    "setId": "static-testing",
    "title": "静态测试",
    "order": 6
  },
  {
    "setId": "system-testing-1",
    "title": "系统测试1",
    "order": 7
  },
  {
    "setId": "performance-testing",
    "title": "性能测试练习题",
    "order": 8
  },
  {
    "setId": "localization-testing",
    "title": "本地化测试习题",
    "order": 9
  }
];

export const SOFTWARE_TESTING_QUESTIONS = [
  {
    "id": "st-001",
    "setId": "practice-1",
    "setTitle": "软件测试练习 1",
    "numberInSet": 1,
    "globalNumber": 1,
    "type": "SINGLE_CHOICE",
    "stem": "软件生存周期过程中，修改错误代价最大的阶段是（          ）",
    "options": [
      "需求阶段",
      "设计阶段",
      "编程阶段",
      "发布运行阶段"
    ],
    "answer": "D",
    "analysis": ""
  },
  {
    "id": "st-002",
    "setId": "practice-1",
    "setTitle": "软件测试练习 1",
    "numberInSet": 2,
    "globalNumber": 2,
    "type": "SINGLE_CHOICE",
    "stem": "下列选项中，哪一项不是软件开发模型？",
    "options": [
      "V模型",
      "迭代模型",
      "螺旋模型",
      "敏捷模型"
    ],
    "answer": "A",
    "analysis": ""
  },
  {
    "id": "st-003",
    "setId": "practice-1",
    "setTitle": "软件测试练习 1",
    "numberInSet": 3,
    "globalNumber": 3,
    "type": "MULTIPLE_CHOICE",
    "stem": "优秀测试工程师应具有的职业素养",
    "options": [
      "沟通能力",
      "怀疑精神",
      "责任感",
      "技术能力"
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "analysis": ""
  },
  {
    "id": "st-004",
    "setId": "practice-1",
    "setTitle": "软件测试练习 1",
    "numberInSet": 4,
    "globalNumber": 4,
    "type": "TRUE_FALSE",
    "stem": "测试人员说：“没有可运行的程序，我无法进行测试工作”。",
    "options": [
      "对",
      "错"
    ],
    "answer": "错",
    "analysis": ""
  },
  {
    "id": "st-005",
    "setId": "practice-1",
    "setTitle": "软件测试练习 1",
    "numberInSet": 5,
    "globalNumber": 5,
    "type": "TRUE_FALSE",
    "stem": "软件存在缺陷是由于开发人员技术水平有限引起的，一个非常优秀的程序员可以开发出零缺陷的软件产品。",
    "options": [
      "对",
      "错"
    ],
    "answer": "错",
    "analysis": ""
  },
  {
    "id": "st-006",
    "setId": "practice-1",
    "setTitle": "软件测试练习 1",
    "numberInSet": 6,
    "globalNumber": 6,
    "type": "TRUE_FALSE",
    "stem": "软件测试就是程序调试。",
    "options": [
      "对",
      "错"
    ],
    "answer": "错",
    "analysis": ""
  },
  {
    "id": "st-007",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 1,
    "globalNumber": 7,
    "type": "SINGLE_CHOICE",
    "stem": "软件测试的对象包括（        ）。",
    "options": [
      "程序源代码",
      "需求分析、概要设计和详细设计",
      "需求规格说明书",
      "以上所有"
    ],
    "answer": "D",
    "analysis": ""
  },
  {
    "id": "st-008",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 2,
    "globalNumber": 8,
    "type": "SINGLE_CHOICE",
    "stem": "以下哪一种选项不属于软件缺陷（       ）。",
    "options": [
      "软件没有实现产品规格说明所要求的功能",
      "软件中出现了产品规格说明不应该出现的功能",
      "软件实现了产品规格说明没有提到的功能",
      "软件实现了产品规格说明所要求等功能但因受性能限制而未考虑可移植性问题"
    ],
    "answer": "D",
    "analysis": ""
  },
  {
    "id": "st-009",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 3,
    "globalNumber": 9,
    "type": "SINGLE_CHOICE",
    "stem": "软件测试是软件开发过程的重要阶段，是软件质量保证的重要手段，下列哪个（些）是软件测试的任务？                                              （          ）\nⅠ预防软件发生错误　　Ⅱ改正程序错误　　Ⅲ提供诊断错误信息",
    "options": [
      "只有Ⅰ",
      "只有Ⅱ",
      "只有Ⅲ",
      "都是"
    ],
    "answer": "C",
    "analysis": ""
  },
  {
    "id": "st-010",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 4,
    "globalNumber": 10,
    "type": "MULTIPLE_CHOICE",
    "stem": "TMap所定义的测试生命周期包括",
    "options": [
      "Planning and Control（计划和控制）",
      "Perparation（准备）",
      "Specification（说明）",
      "Execution(执行)"
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "analysis": ""
  },
  {
    "id": "st-011",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 5,
    "globalNumber": 11,
    "type": "MULTIPLE_CHOICE",
    "stem": "探索性测试具有的特点",
    "options": [
      "上下文驱动",
      "学习、设计和执行并行",
      "强调逻辑分析",
      "强调个人能力"
    ],
    "answer": [
      "A",
      "B",
      "D"
    ],
    "analysis": ""
  },
  {
    "id": "st-012",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 6,
    "globalNumber": 12,
    "type": "MULTIPLE_CHOICE",
    "stem": "敏捷测试核心价值观",
    "options": [
      "共享质量目标",
      "在产品中内建可测试性",
      "关注产品质量的提升，测试周期的缩短",
      "仅专注于发现缺陷"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "analysis": ""
  },
  {
    "id": "st-013",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 7,
    "globalNumber": 13,
    "type": "FILL_BLANK",
    "stem": "敏捷测试要求“                  ”而非单纯的“发现缺陷”",
    "options": [],
    "answer": [
      "交付可用产品"
    ],
    "analysis": ""
  },
  {
    "id": "st-014",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 8,
    "globalNumber": 14,
    "type": "FILL_BLANK",
    "stem": "敏捷测试是符合                 的思想，遵循                 原则，在敏捷开发环境下能够很好地和其整体开发流程融合的一系列的测试实践。",
    "options": [],
    "answer": [
      "敏捷测试宣言",
      "敏捷开发"
    ],
    "analysis": ""
  },
  {
    "id": "st-015",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 9,
    "globalNumber": 15,
    "type": "TRUE_FALSE",
    "stem": "设计－实现－测试，软件测试事开发后期的一个阶段。",
    "options": [
      "对",
      "错"
    ],
    "answer": "错",
    "analysis": ""
  },
  {
    "id": "st-016",
    "setId": "practice-2",
    "setTitle": "软件测试练习 2",
    "numberInSet": 10,
    "globalNumber": 16,
    "type": "TRUE_FALSE",
    "stem": "现在比较流行的软件开发模型是螺旋模型。",
    "options": [
      "对",
      "错"
    ],
    "answer": "错",
    "analysis": "现在比较流行的开发模型为敏捷模型。"
  },
  {
    "id": "st-017",
    "setId": "practice-3",
    "setTitle": "软件测试练习 3",
    "numberInSet": 1,
    "globalNumber": 17,
    "type": "SINGLE_CHOICE",
    "stem": "错误推测的基本想法是（      ）。",
    "options": [
      "列举出程序中所有可能有的错误和容易发生错误的特殊情况，根据它们选择测试用例。",
      "划分有效等价类和无效等价类",
      "划分原因和结果",
      "列出所有的可能情况"
    ],
    "answer": "A",
    "analysis": ""
  },
  {
    "id": "st-018",
    "setId": "practice-3",
    "setTitle": "软件测试练习 3",
    "numberInSet": 2,
    "globalNumber": 18,
    "type": "MULTIPLE_CHOICE",
    "stem": "边界值法中边界选择的原则：（           ）",
    "options": [
      "按照输入值范围的边界。",
      "按照输入/输出值个数的边界。",
      "输出值域的边界。",
      "输入/输出有序集的边界。"
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "analysis": ""
  },
  {
    "id": "st-019",
    "setId": "practice-3",
    "setTitle": "软件测试练习 3",
    "numberInSet": 3,
    "globalNumber": 19,
    "type": "MULTIPLE_CHOICE",
    "stem": "请阅读下列信息，选择边界值分析法的测试用例（）\n一个程序将百分制的成绩转换成不同的等级，换算规则：\n分数在100-90之间对应等级为A;\n分数在89-80之间对应等级为B;\n分数在79-70之间对应等级为C;\n分数在69-60之间对应等级为D;\n分数在59-0之间对应等级为F;",
    "options": [
      "100",
      "59",
      "200",
      "70"
    ],
    "answer": [
      "A",
      "B",
      "D"
    ],
    "analysis": ""
  },
  {
    "id": "st-020",
    "setId": "practice-3",
    "setTitle": "软件测试练习 3",
    "numberInSet": 4,
    "globalNumber": 20,
    "type": "MULTIPLE_CHOICE",
    "stem": "请阅读下列信息，选择有效等价类的测试用例（）\n一个程序将百分制的成绩转换成不同的等级，换算规则：\n分数在100-90之间对应等级为A;\n分数在89-80之间对应等级为B;\n分数在79-70之间对应等级为C;\n分数在69-60之间对应等级为D;\n分数在59-0之间对应等级为F;",
    "options": [
      "13",
      "101",
      "55",
      "-5"
    ],
    "answer": [
      "A",
      "C"
    ],
    "analysis": ""
  },
  {
    "id": "st-021",
    "setId": "practice-3",
    "setTitle": "软件测试练习 3",
    "numberInSet": 5,
    "globalNumber": 21,
    "type": "FILL_BLANK",
    "stem": "等价类划分法可将输入数据划分为                       和                         。",
    "options": [],
    "answer": [
      "有效等价类",
      "无效等价类"
    ],
    "analysis": ""
  },
  {
    "id": "st-022",
    "setId": "practice-3",
    "setTitle": "软件测试练习 3",
    "numberInSet": 6,
    "globalNumber": 22,
    "type": "FILL_BLANK",
    "stem": "软件不仅要能接收合理的数据， 也要能经受意外的考验， 因此，等价类划分可以有两种不同的情况                  和                。",
    "options": [],
    "answer": [
      "有效等价类",
      "无效等价类"
    ],
    "analysis": ""
  },
  {
    "id": "st-023",
    "setId": "practice-3",
    "setTitle": "软件测试练习 3",
    "numberInSet": 7,
    "globalNumber": 23,
    "type": "TRUE_FALSE",
    "stem": "有效等价类可以捕获程序中的缺陷，而无效等价类不能捕获缺陷。",
    "options": [
      "对",
      "错"
    ],
    "answer": "错",
    "analysis": ""
  },
  {
    "id": "st-024",
    "setId": "practice-3",
    "setTitle": "软件测试练习 3",
    "numberInSet": 8,
    "globalNumber": 24,
    "type": "TRUE_FALSE",
    "stem": "如果程序要求输入值是一个有限区间的值，可以划分为1个有效等价类（取值范围）和1个无效等价类（取值范围之外）。",
    "options": [
      "对",
      "错"
    ],
    "answer": "错",
    "analysis": ""
  },
  {
    "id": "st-025",
    "setId": "practice-4",
    "setTitle": "软件测试练习 4",
    "numberInSet": 1,
    "globalNumber": 25,
    "type": "SINGLE_CHOICE",
    "stem": "因果图在进行测试用例设计时重点考虑以下问题：  （         ）。",
    "options": [
      "输入条件",
      "输出条件",
      "输入条件组合",
      "输出条件组合"
    ],
    "answer": "C",
    "analysis": ""
  },
  {
    "id": "st-026",
    "setId": "practice-4",
    "setTitle": "软件测试练习 4",
    "numberInSet": 2,
    "globalNumber": 26,
    "type": "FILL_BLANK",
    "stem": "决策表通常由                    、                   、                 、                 4部分组成。",
    "options": [],
    "answer": [
      "条件桩",
      "条件项",
      "动作桩",
      "动作项"
    ],
    "analysis": ""
  },
  {
    "id": "st-027",
    "setId": "practice-4",
    "setTitle": "软件测试练习 4",
    "numberInSet": 3,
    "globalNumber": 27,
    "type": "FILL_BLANK",
    "stem": "ALAC的出发点是著名的                               规律",
    "options": [],
    "answer": [
      "Pareto 80/20"
    ],
    "analysis": ""
  },
  {
    "id": "st-028",
    "setId": "practice-4",
    "setTitle": "软件测试练习 4",
    "numberInSet": 4,
    "globalNumber": 28,
    "type": "FILL_BLANK",
    "stem": "因果图法着重分析输入条件的各种组合，每种组合条件就是                 ，它必然有一个输出的结果，这就是                  。",
    "options": [],
    "answer": [
      "因",
      "果"
    ],
    "analysis": ""
  },
  {
    "id": "st-029",
    "setId": "practice-4",
    "setTitle": "软件测试练习 4",
    "numberInSet": 5,
    "globalNumber": 29,
    "type": "FILL_BLANK",
    "stem": "Web版微信登录测试需要考虑的因素\n服务器：IIS、Apache、Jetty；\n操作系统：Windows 7、Window 10、Linux；\n插件：无、小程序、微信插件；\n浏览器：IE11、Chrome、FireFox。在用正交实验设计时，其有                 个因子和                 个水平。",
    "options": [],
    "answer": [
      "4",
      "3"
    ],
    "analysis": ""
  },
  {
    "id": "st-030",
    "setId": "practice-5",
    "setTitle": "软件测试练习 5",
    "numberInSet": 1,
    "globalNumber": 30,
    "type": "SINGLE_CHOICE",
    "stem": "因果图在进行测试用例设计时重点考虑以下问题：  （         ）。",
    "options": [
      "输入条件",
      "输出条件",
      "输入条件组合",
      "输出条件组合"
    ],
    "answer": "C",
    "analysis": ""
  },
  {
    "id": "st-031",
    "setId": "practice-5",
    "setTitle": "软件测试练习 5",
    "numberInSet": 2,
    "globalNumber": 31,
    "type": "SINGLE_CHOICE",
    "stem": "某次程序调试没有出现预计的结果，下列（     ）不可能是导致出错的原因。",
    "options": [
      "变量没有初始化",
      "编写的语句书写格式不规范",
      "循环控制出错",
      "代码输入有误"
    ],
    "answer": "B",
    "analysis": ""
  },
  {
    "id": "st-032",
    "setId": "practice-5",
    "setTitle": "软件测试练习 5",
    "numberInSet": 3,
    "globalNumber": 32,
    "type": "FILL_BLANK",
    "stem": "语句覆盖的目的是测试程序中的代码是否被执行，它只测试代码中的               。",
    "options": [],
    "answer": [
      "执行语句"
    ],
    "analysis": ""
  },
  {
    "id": "st-033",
    "setId": "practice-5",
    "setTitle": "软件测试练习 5",
    "numberInSet": 4,
    "globalNumber": 33,
    "type": "FILL_BLANK",
    "stem": "是指判定语句中的每个条件都要取真、假值各一次。",
    "options": [],
    "answer": [
      "条件覆盖"
    ],
    "analysis": ""
  },
  {
    "id": "st-034",
    "setId": "practice-5",
    "setTitle": "软件测试练习 5",
    "numberInSet": 5,
    "globalNumber": 34,
    "type": "FILL_BLANK",
    "stem": "要求判定语句中的所有条件取值的可能组合都至少出现一次。",
    "options": [],
    "answer": [
      "条件组合覆盖"
    ],
    "analysis": ""
  },
  {
    "id": "st-035",
    "setId": "practice-5",
    "setTitle": "软件测试练习 5",
    "numberInSet": 6,
    "globalNumber": 35,
    "type": "SUBJECTIVE",
    "stem": "条件组合测试的测试重点",
    "options": [],
    "answer": "",
    "analysis": ""
  },
  {
    "id": "st-036",
    "setId": "static-testing",
    "setTitle": "静态测试",
    "numberInSet": 1,
    "globalNumber": 36,
    "type": "MULTIPLE_CHOICE",
    "stem": "单元测试的主要依据是",
    "options": [
      "《软件需求规格说明书》",
      "黑盒测试方法",
      "白盒测试方法",
      "软件详细设计说明书"
    ],
    "answer": [
      "A",
      "D"
    ],
    "analysis": ""
  },
  {
    "id": "st-037",
    "setId": "static-testing",
    "setTitle": "静态测试",
    "numberInSet": 2,
    "globalNumber": 37,
    "type": "MULTIPLE_CHOICE",
    "stem": "属于静态测试工具有",
    "options": [
      "CheckStyle",
      "FindBugs",
      "PMD",
      "JUnit"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "analysis": ""
  },
  {
    "id": "st-038",
    "setId": "system-testing-1",
    "setTitle": "系统测试1",
    "numberInSet": 1,
    "globalNumber": 38,
    "type": "SINGLE_CHOICE",
    "stem": "下面说法中属于系统测试的目标的是（   ）。\n①找出软件中存在的缺陷与错误\n②确认软件所实现的功能是否符合规格说明\n③确认软件的性能是否满足要求",
    "options": [
      "仅①",
      "①和②",
      "①、②和③",
      "②和③"
    ],
    "answer": "C",
    "analysis": ""
  },
  {
    "id": "st-039",
    "setId": "system-testing-1",
    "setTitle": "系统测试1",
    "numberInSet": 2,
    "globalNumber": 39,
    "type": "SINGLE_CHOICE",
    "stem": "以下关于功能测试用例的意义的叙述，正确的是（  ）\n①、避免盲目测试并提高测试效率\n②、令软件测试的实施重点突出、目的明确\n③、在回归测试中无需修正测试用例便可继续开展测试工作\n④、测试用例的通用化和复用化使软件测试易于开展",
    "options": [
      "①、②、③",
      "①、③",
      "②、③",
      "①、②、④"
    ],
    "answer": "A",
    "analysis": ""
  },
  {
    "id": "st-040",
    "setId": "system-testing-1",
    "setTitle": "系统测试1",
    "numberInSet": 3,
    "globalNumber": 40,
    "type": "MULTIPLE_CHOICE",
    "stem": "用户界面测试的重点是（            ）。",
    "options": [
      "正确",
      "易用",
      "视觉效果",
      "非法输入控制"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "analysis": "验收测试"
  },
  {
    "id": "st-041",
    "setId": "system-testing-1",
    "setTitle": "系统测试1",
    "numberInSet": 4,
    "globalNumber": 41,
    "type": "MULTIPLE_CHOICE",
    "stem": "下列属于回归测试的目的的是（          ）。",
    "options": [
      "检验软件的修改达到了预定目的",
      "检验软件的修改不会影响软件的其他功能的正确性",
      "检验改动不会带来不可预料的行为或者另外的错误",
      "检验修改的测试用例是否完整"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "analysis": ""
  },
  {
    "id": "st-042",
    "setId": "system-testing-1",
    "setTitle": "系统测试1",
    "numberInSet": 5,
    "globalNumber": 42,
    "type": "MULTIPLE_CHOICE",
    "stem": "对某个接口测试中，需要了解以下哪些内容？",
    "options": [
      "参数类型",
      "可选参数和必选参数",
      "输入正确参数和错误参数时，接口的返回值",
      "接口行为"
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "analysis": ""
  },
  {
    "id": "st-043",
    "setId": "performance-testing",
    "setTitle": "性能测试练习题",
    "numberInSet": 1,
    "globalNumber": 43,
    "type": "SINGLE_CHOICE",
    "stem": "关于性能测试，说法错误的是",
    "options": [
      "软件响应慢属于性能测试问题。",
      "性能测试就是使用性能测试工具模拟正常、峰值及异常负载状态，对系统的各项性能指标进行测试的活动。",
      "性能测试可以发现系统瓶颈。",
      "性能测试是以验证功能完整实现为目的。"
    ],
    "answer": "D",
    "analysis": ""
  },
  {
    "id": "st-044",
    "setId": "performance-testing",
    "setTitle": "性能测试练习题",
    "numberInSet": 2,
    "globalNumber": 44,
    "type": "SINGLE_CHOICE",
    "stem": "下列选项中，哪一项不是性能测试指标？",
    "options": [
      "响应时间",
      "TPS",
      "DPH",
      "吞吐量"
    ],
    "answer": "C",
    "analysis": ""
  },
  {
    "id": "st-045",
    "setId": "performance-testing",
    "setTitle": "性能测试练习题",
    "numberInSet": 3,
    "globalNumber": 45,
    "type": "FILL_BLANK",
    "stem": "吞吐量是指                     内系统能够完成的工作量。",
    "options": [],
    "answer": [
      "单位时间"
    ],
    "analysis": ""
  },
  {
    "id": "st-046",
    "setId": "performance-testing",
    "setTitle": "性能测试练习题",
    "numberInSet": 4,
    "globalNumber": 46,
    "type": "FILL_BLANK",
    "stem": "是指系统每秒钟能够处理的事务和交易的数量。",
    "options": [],
    "answer": [
      "TPS"
    ],
    "analysis": ""
  },
  {
    "id": "st-047",
    "setId": "performance-testing",
    "setTitle": "性能测试练习题",
    "numberInSet": 5,
    "globalNumber": 47,
    "type": "FILL_BLANK",
    "stem": "Selenium的3个核心组件是             、              、            。",
    "options": [],
    "answer": [
      "Selenium IDE",
      "Selenium Grid",
      "Selenium RC"
    ],
    "analysis": ""
  },
  {
    "id": "st-048",
    "setId": "performance-testing",
    "setTitle": "性能测试练习题",
    "numberInSet": 6,
    "globalNumber": 48,
    "type": "TRUE_FALSE",
    "stem": "压力测试是给系统加压直到系统崩溃，以此来确定系统最大负载能力。",
    "options": [
      "对",
      "错"
    ],
    "answer": "对",
    "analysis": ""
  },
  {
    "id": "st-049",
    "setId": "performance-testing",
    "setTitle": "性能测试练习题",
    "numberInSet": 7,
    "globalNumber": 49,
    "type": "TRUE_FALSE",
    "stem": "并发数量增大可能会导致系统响应变慢。",
    "options": [
      "对",
      "错"
    ],
    "answer": "对",
    "analysis": ""
  },
  {
    "id": "st-050",
    "setId": "localization-testing",
    "setTitle": "本地化测试习题",
    "numberInSet": 1,
    "globalNumber": 50,
    "type": "TRUE_FALSE",
    "stem": "翻译是软件测试本地化的一部分工作。",
    "options": [
      "对",
      "错"
    ],
    "answer": "对",
    "analysis": ""
  },
  {
    "id": "st-051",
    "setId": "localization-testing",
    "setTitle": "本地化测试习题",
    "numberInSet": 2,
    "globalNumber": 51,
    "type": "SUBJECTIVE",
    "stem": "关于某办公软件的软件测试本地化。\nInsert the graphics you want by clicking Picture(Insert  menu),and then resize if nessary, if your own drawing, click the Drawing button and use the toolbar buttons to create a graphic or special text effects.",
    "options": [],
    "answer": "单击“图片”（“插入”菜单）可插入所需图形，然后可根据需要对其调整大小，如果想自己绘制图形，可单击“绘图”按钮，用工具栏按钮来创建图形或特殊文字效果。",
    "analysis": ""
  },
  {
    "id": "st-052",
    "setId": "localization-testing",
    "setTitle": "本地化测试习题",
    "numberInSet": 3,
    "globalNumber": 52,
    "type": "SUBJECTIVE",
    "stem": "对下面的界面进行本地化测试？\nFirst   Name\nLast   Name\nEmail   Address\nChoose   a password (Min. 4 characters )\nCreate my account\nBy   creating your account you agree to our terms of service",
    "options": [],
    "answer": "",
    "analysis": ""
  }
];

const TYPE_VALUES = Object.values(SOFTWARE_TESTING_QUESTION_TYPES);

export const SOFTWARE_TESTING_SETS = SOFTWARE_TESTING_SET_DEFINITIONS.map((set) => {
  const questions = SOFTWARE_TESTING_QUESTIONS.filter((question) => question.setId === set.setId);
  const typeCounts = TYPE_VALUES.reduce((counts, type) => {
    counts[type] = questions.filter((question) => question.type === type).length;
    return counts;
  }, {});

  return {
    ...set,
    totalCount: questions.length,
    typeCounts,
    objectiveCount: questions.filter((question) => question.type !== SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE).length,
    subjectiveCount: questions.filter((question) => question.type === SOFTWARE_TESTING_QUESTION_TYPES.SUBJECTIVE).length,
  };
});
