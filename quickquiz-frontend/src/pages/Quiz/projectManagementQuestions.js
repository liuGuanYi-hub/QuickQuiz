export const PROJECT_MANAGEMENT_QUESTION_TYPES = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  SUBJECTIVE: 'SUBJECTIVE',
};

export const PROJECT_MANAGEMENT_MODULES = [
  "项目基础与立项",
  "需求与范围管理",
  "成本管理",
  "进度与计划管理",
  "风险管理",
  "配置与变更管理",
  "人力与资源管理",
  "质量管理与 CMMI"
];

export const PROJECT_MANAGEMENT_QUESTIONS = [
  {
    "id": "pm-001",
    "number": 1,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "与例行工作相比，项目具有明显的特点。其中（ ）是指每一个项目都有一个明确的开始时间与结束时间。",
    "options": [
      "临时性",
      "按时性",
      "独特性",
      "渐进明细"
    ],
    "answer": "A",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-002",
    "number": 2,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "以下关于项目与项目管理的描述不正确的是 （）",
    "options": [
      "项目目标就是所能交付的成果或服务的期望效果",
      "渐进明细是指项目的成果性目标是逐步完成的",
      "项目的目标不存在优先级，项目目标具有层次性",
      "项目整体管理属于项目管理核心知识域"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-003",
    "number": 3,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "与组织日常的、例行的运营工作不同，项目具有些非常明显的特点。“没有完全一样的项目” 体现了项目的（）。",
    "options": [
      "临时性",
      "独特性",
      "差异性",
      "系统性"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-004",
    "number": 4,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "现代项目管理过程中，一般会将项目的进度、成本、质量和范围作为项目管理的目标，这体现了项目管理的（）特点。",
    "options": [
      "多目标性",
      "层次性",
      "系统性",
      "优先性"
    ],
    "answer": "A",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-005",
    "number": 5,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "关于项目管理的描述,不正确的是（）。",
    "options": [
      "项目管理的主要目的是实现 企业管理目标",
      "在项目管理中,时间是一种特殊的资源",
      "项目管理的职能是对资源进行计划、组织、指挥、协调、控制",
      "项目管理把各种知识、技能、手段和技术应用于项目活动中"
    ],
    "answer": "A",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-006",
    "number": 6,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "某公司下设硬件研发部、软件研发部、结构设计部、生产车间等部门,当执行项目遇到硬件问题时,参与项目人员先向自己部门的领导反馈,由部门领导再和硬件部门经理沟通,该组织结构类型的缺点是（）",
    "options": [
      "组织横向之间的联系薄弱,部门间协调难度大",
      "管理成本高,多头领导,难以监测和控制",
      "项目环境比较封闭,不利于沟通、技术知识等共享",
      "员工缺乏事业上的连续性和保障"
    ],
    "answer": "A",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-007",
    "number": 7,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "项目生命周期是指项目从启动到收尾所经历的一系列阶段，当项目进入收尾阶段时（）较 高。",
    "options": [
      "项目的风险",
      "人力投入",
      "变更的代价",
      "不确定性"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-008",
    "number": 8,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "关于项目生命周期特征的描述，正确的是（）",
    "options": [
      "项目生命周期越长，越有利于项目的进行",
      "风险会随着项目的执行越来越大",
      "风险和不确定性在项目开始时最大，并随项目进展而减弱",
      "项目生命周期应保持投入人力始终不变"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-009",
    "number": 9,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "项目发生变更在所难免。项目经理应让项目干系人（特别是业主）认识到 ()",
    "options": [
      "在项目策划阶段，变更成本较高",
      "在项目策划阶段，变更成本较低",
      "在项目策划阶段，变更带来的附加值较低",
      "在项目执行阶段，变更成本较低"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-010",
    "number": 10,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "在项目的一个阶段末，开始下一阶段之前，应该确保 () 。",
    "options": [
      "下个阶段的资源能得到",
      "进程达到它的基准",
      "采取纠正措施获得项目结果",
      "达到阶段的目标以及正式接受项目阶段成果"
    ],
    "answer": "D",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-011",
    "number": 11,
    "module": "项目基础与立项",
    "type": "SUBJECTIVE",
    "stem": "软件商品的特性有（）、无损耗性、易复制性。",
    "options": [],
    "answer": "无形性",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-012",
    "number": 12,
    "module": "项目基础与立项",
    "type": "SUBJECTIVE",
    "stem": "软件工程活动的步骤有问题定义、（）、需求分析、（）、详细设计、实现、（）以及支持",
    "options": [],
    "answer": "可行性研究 ； 总体设计 ； 确认",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-013",
    "number": 13,
    "module": "项目基础与立项",
    "type": "SUBJECTIVE",
    "stem": "项目的生命周期经历了启动阶段、（）、实施阶段和（）。",
    "options": [],
    "answer": "计划阶段 ； 结束阶段",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-014",
    "number": 14,
    "module": "项目基础与立项",
    "type": "SUBJECTIVE",
    "stem": "项目管理的知识体系有集成管理、（）、时间管理、成本管理、（）、（）、沟通管理、采购管理、风险管理。",
    "options": [],
    "answer": "范围管理 ； 质量管理 ； 人力资源管理",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-015",
    "number": 15,
    "module": "项目基础与立项",
    "type": "SUBJECTIVE",
    "stem": "软件项目产品的特点有抽象性、（）、高度复杂性、（）。",
    "options": [],
    "answer": "缺陷检测的困难性 ； 缺乏统一规则",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-016",
    "number": 16,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "()不是项目目标特性。",
    "options": [
      "多目标性",
      "优先性",
      "临时性",
      "层次性"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-017",
    "number": 17,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "（）不属于典型的信息系统项目的特点；",
    "options": [
      "使用与维护的要求复杂",
      "需求稳定",
      "设计人员高度专业化",
      "智力密集型"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-018",
    "number": 18,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "管理项目干系人参与过程的主要作用是（）。",
    "options": [
      "限制干系人参与项目",
      "鼓励干系人参与项目",
      "提升干系人对项目支持",
      "干系人进行沟通"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-019",
    "number": 19,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "在( )中，项目经理的权力最小。",
    "options": [
      "强矩阵型组织",
      "平衡矩阵组织",
      "弱矩阵型组织",
      "项目型组织"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-020",
    "number": 20,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "矩阵型组织的缺点不包括( ) 。",
    "options": [
      "管理成本增加",
      "员工缺乏事业上的连续性和保障",
      "多头领导",
      "资源分配与项目优先的问题产生冲突"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-021",
    "number": 21,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "某公司下设硬件研发部、软件研发部、结构设计部、生产车间等部门,当执行项目遇到硬件问题时,参与项目人员先向自己部门的领导反馈,由部门领导再和硬件部门经理沟通,该组织结构类型的缺点是:()。",
    "options": [
      "组织横向之间的联系薄弱,部门间协调难度大",
      "管理成本高,多头领导,难以监测和控制",
      "项目环境比较封闭,不利于沟通、技术知识等共享",
      "员工缺乏事业上的连续性和保障"
    ],
    "answer": "A",
    "analysis": "题目讲的是职能型组织结构",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-022",
    "number": 22,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "某项目组织结构中,项目经理全职管理项目,拥有很大的职权,且组织中全职参与项目工作的职员比例占70%。该项目组织结构属于（）。",
    "options": [
      "弱矩阵型",
      "强矩阵型",
      "平衡矩阵型",
      "职能矩阵型"
    ],
    "answer": "B",
    "analysis": "项目经理权利： 职能型：0% 弱矩阵：0-25% 平衡矩阵：15%-60% 强矩阵：50-95% 项目型：85-100%",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-023",
    "number": 23,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "关于项目管理办公室(PMO)的描述中，不正确的是(D ) 。",
    "options": [
      "PMO 在组织内部承担起了将组织战略目标通过一个个的项目执行加以实现的职能",
      "PMO 建立组织内项目管理的支撑环境",
      "PMO 负责组织内多项目的管理和监控",
      "PMO 和项目经理追求相同的任务目标，并受相同的需求驱动"
    ],
    "answer": "D",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-024",
    "number": 24,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "下列都是项目管理办公室(PMO)的正确说法，除了（）",
    "options": [
      "PMO中的P 除了Project也可以叫作“Program 管理办公室”或“Portfolio管理办公室”",
      "PMO任务范围很广，但不能充当关键的决策人",
      "PMO注重对项目的统一规划、优先顺序、轻重缓急",
      "PMO识别与提出项目管理方法系，最好的做法和标准"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-025",
    "number": 25,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "关于项目生命周期和产品生命周期的叙述，错误的是( ) 。",
    "options": [
      "产品生命周期开始于商业计划，经过产品构思、产品研发、产品的日常运营直到产品不再被使",
      "为了将项目与项目实施组织的日常运营联系起来，项目生命周期也会确定项目结束时的移交安排",
      "一般来说，产品生命周期包含在项目生命周期内",
      "每个项目阶段都以一个或一个以上的可交付物的完成和正式批准为标志，这种可交付物是一 种可度量、可验证的工作产物"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-026",
    "number": 26,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "在项目每个阶段结束时进行项目绩效评审是很重要的，评审的目标是(D )。",
    "options": [
      "根据项目的基准计划来决定完成该项目需要多少资源",
      "根据上一阶段的绩效调整下一阶段的进度和成本基准",
      "得到客户对项目绩效认同",
      "决定项目是否可以进入下一个阶段"
    ],
    "answer": "D",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-027",
    "number": 27,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "以下关于项目可行性研究内容的叙述， ( ) 是不正确的。",
    "options": [
      "技术可行性是从项目实施的技术角度，合理设计技术方案，并进行评审和评价",
      "经济可行性主要是从资源配置的角度衡量项目的价值，从项目的投资及所产生的经济效益进行分析",
      "可行性研究不涉及合同责任、知识产权等法律方面的可行性问题",
      "社会可行性主要分析项目对社会的影响，包括法律道德、民族宗教、社会稳定性等"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-028",
    "number": 28,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "某企业针对“新一代网络操作系统”开发项目进行可行性论证。在论证的最初阶段，一般情况下不会涉及到( )。",
    "options": [
      "调研了解新一代网络操作系统的市场需求",
      "分析论证是否具备相应的开发技术",
      "详细估计系统开发周期",
      "结合企业财务经济情况进行论证分析"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-029",
    "number": 29,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "以下关于项目评估的叙述中，( )是正确的。",
    "options": [
      "项目评估的最终成果是项目评估报告",
      "项目评估在项目可行性研究之前后进行",
      "项目建议书作为项目评估的唯一依据",
      "项目评估可由项目申请者自行完成"
    ],
    "answer": "A",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-030",
    "number": 30,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "在编写项目可行性研究报告时，风险因素及对策主要是对项目的市场风险（）法律风险，经济及社会风险等因素进行评价，制定规避风险的对策，为项目的全过程的管理提供依据。",
    "options": [
      "计算风险，财务防线，环境风险",
      "技术风险，财务风险，组织风险",
      "技术风险，组织风险，环境风险",
      "财务风险，组织风险，环境风险"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-031",
    "number": 31,
    "module": "项目基础与立项",
    "type": "SINGLE_CHOICE",
    "stem": "承建方的立项管理一般经过（）等四个阶段。",
    "options": [
      "项目识别，项目论证，投标，签订合同",
      "项目论证，投标，合同谈判，签订合同",
      "项目识别，技术可行性分析，合同谈判，合同签订",
      "项目论证，项目识别，合同谈判，签订合同"
    ],
    "answer": "A",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-032",
    "number": 32,
    "module": "需求与范围管理",
    "type": "SUBJECTIVE",
    "stem": "什么是需求状态？根据需求的不同处理，需求状态可分为几种，是什么？",
    "options": [],
    "answer": "需求状态是某个时间点用户需求的一种反映。需求状态可分为8种：已建议、已批准、已拒绝、已设计、已实现、已验证、已交付、已删除。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-033",
    "number": 33,
    "module": "需求与范围管理",
    "type": "SUBJECTIVE",
    "stem": "变更管理过程分为几个阶段，分别是什么？",
    "options": [],
    "answer": "变更管理可分为3个阶段，分别是变更描述、变更分析和变更实现",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-034",
    "number": 34,
    "module": "需求与范围管理",
    "type": "SUBJECTIVE",
    "stem": "为了进行有效的需求管理，通常要遵循哪些原则？",
    "options": [],
    "answer": "1、需求一定要分类管理； 2、需求必须分优先级； 3、需求必须文档化； 4、需求一旦变化，就必须对需求变更的影响进行评估； 5、需求管理必须与需求工程的其他活动紧密整合。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-035",
    "number": 35,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "项目建议书是项目建设单位进行项目申请时提交的文件，其中“项目建设目标与主要内容建设”一般出现在项目建议书的（）部分。",
    "options": [
      "项目建设单位概况",
      "项目建设必要性",
      "总体建设方案",
      "业务分析"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-036",
    "number": 36,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "( )是承建方项目立项的第一步，其目的在于选择投资机会、鉴别投资方向。",
    "options": [
      "项目论证",
      "项目评估",
      "项目识别",
      "项目可行性分析"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-037",
    "number": 37,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "建设方在进行项目评估的时候，根据项目的类型不同，所采用的评估方法也不同。如果使用总量评估法，其难点是( ) 。",
    "options": [
      "如何准确确定新增投入资金的经济效果",
      "确定原有固定资产重估值",
      "评价追加投资的经济效果",
      "确定原有固定资产对项目的影响"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-038",
    "number": 38,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "项目论证一般分为机会研究、初步可行性研究和详细可行性研究三个阶段。以下叙述中( )是正确的。",
    "options": [
      "机会研究的内容为项目是否有生命力，能否盈利",
      "详细可行性研究是要寻求投资机会，鉴别投资方向",
      "初步可行性研究阶段在多方案比较的基础上选择出最优方案",
      "项目论证是确定项目是否实施的前提"
    ],
    "answer": "D",
    "analysis": "A.机会研究的内容为项目是否有生命力，能否盈利-》初步可行性研究 B.详细可行性研究是要寻求投资机会，鉴别投资方向-》机会研究 C.初步可行性研究阶段在多方案比较的基础上选择出最优方案-》详细可行性研究",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-039",
    "number": 39,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "项目论证是指对拟实施项目技术上的先进性、适用性，经济上的合理性、盈利性，实施上的可能性、风险可控性进行全面科学的综合分析，为项目决策提供客观依据的一种技术经济研究活动。以下关于项目论证的叙述，错误的是( )。",
    "options": [
      "项目论证的作用之一是作为筹措资金、向银行贷款的依据",
      "项目论证的内容之一是国民经济评价，通常运用影子价格、影子汇率、影子工资等工具或参数",
      "数据资料是项目论证的支柱",
      "项目财务评价是从项目的宏观（国家经济，社会经济的角度）角度判断项目或不同方案在财务上的可行性的技术经济活动"
    ],
    "answer": "D",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-040",
    "number": 40,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "用于信息系统开发的各类资源总是有限的，当这些有限资源无法同时满足全部 应用项目的实施时，就应该对这些应用项目的优先顺序给予合理分配。人们提出了若干 用于分配开发信息系统稀少资源的方法，并对每种方法都提出了相应的决策基本标准。 其中( )的基本思想是对各应用项目不仅要分别进行评价，而且还应该把他们作为实现系统总体方案的组成部分去评价。该方法应该考虑项目的风险性、对组织的战略方向的支持等因素。",
    "options": [
      "全面评审法",
      "成本或效益比较法",
      "收费法",
      "指导委员会法"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-041",
    "number": 41,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "在需求工程中，以下哪一项不属于需求开发阶段的任务？",
    "options": [
      "需求获取",
      "需求分析",
      "需求验证",
      "需求实现"
    ],
    "answer": "D",
    "analysis": "需求开发阶段主要包括需求获取、需求分析和需求验证，而不包括需求实现。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-042",
    "number": 42,
    "module": "需求与范围管理",
    "type": "TRUE_FALSE",
    "stem": "需求管理的主要目的是确保需求的一致性和完整性，以满足项目目标。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "需求管理确实是为了确保需求的一致性和完整性，从而保证项目能够达到预期的目标。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-043",
    "number": 43,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "在需求工程中，以下哪个工具主要用于需求捕获和分析？",
    "options": [
      "UML",
      "Visio",
      "JIRA",
      "需求管理工具"
    ],
    "answer": "D",
    "analysis": "需求管理工具主要用于需求捕获和分析，而UML和Visio主要用于建模，JIRA主要用于项目管理。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-044",
    "number": 44,
    "module": "需求与范围管理",
    "type": "TRUE_FALSE",
    "stem": "需求变更控制是需求管理的重要组成部分，用于确保需求变更得到适当的审查和批准。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "需求变更控制是需求管理的关键环节，确保任何变更都经过适当的审查和批准，以保持需求的一致性和完整性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-045",
    "number": 45,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "在需求开发过程中，以下哪一步骤通常最先进行？",
    "options": [
      "需求分析",
      "需求获取",
      "需求验证",
      "需求实现"
    ],
    "answer": "B",
    "analysis": "需求获取通常是需求开发过程中的第一步，通过与利益相关者沟通来收集需求信息。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-046",
    "number": 46,
    "module": "需求与范围管理",
    "type": "TRUE_FALSE",
    "stem": "需求管理的核心在于协调需求变更，确保项目团队能够及时响应变化。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "需求管理的核心任务之一就是协调需求变更，确保项目团队能够及时响应变化，以维持项目的稳定性和一致性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-047",
    "number": 47,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "在需求工程中，以下哪种方法最适合用于需求获取阶段？",
    "options": [
      "头脑风暴",
      "原型法",
      "访谈",
      "问卷调查"
    ],
    "answer": "C",
    "analysis": "访谈是一种常用的需求获取方法，通过与利益相关者的直接对话来收集需求信息。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-048",
    "number": 48,
    "module": "需求与范围管理",
    "type": "TRUE_FALSE",
    "stem": "需求管理不仅关注需求的记录和跟踪，还涉及需求变更的控制和管理。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "需求管理不仅涉及需求的记录和跟踪，还包括需求变更的控制和管理，以确保需求的一致性和完整性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-049",
    "number": 49,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "在需求工程中，以下哪项不是需求管理的主要活动？",
    "options": [
      "需求跟踪",
      "需求变更控制",
      "需求实现",
      "需求评审"
    ],
    "answer": "C",
    "analysis": "需求管理主要活动包括需求跟踪、需求变更控制和需求评审，而不包括需求实现。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-050",
    "number": 50,
    "module": "需求与范围管理",
    "type": "TRUE_FALSE",
    "stem": "需求开发阶段需要对需求进行详细分析，以确保需求的准确性和完整性。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "需求开发阶段需要对需求进行详细分析，以确保需求的准确性和完整性，从而为后续的设计和实现提供坚实的基础。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-051",
    "number": 51,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "关于工作分解结构WBS的描述，正确的是（）",
    "options": [
      "WBS必须符合项目范围",
      "WBS元素必须由多人负责",
      "WBS必须控制在5-8层",
      "WBS的编制只需要项目团队成员参与"
    ],
    "answer": "A",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-052",
    "number": 52,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "以下关于工作分解结构的叙述，错误的是（）",
    "options": [
      "工作分解结构是项目各项计划和控制措施制定的基础和主要依据",
      "工作分解结构是面向可交付物的层次型结构",
      "工作分解结构可以不包括分包出去的工作",
      "工作分解结构能明确项目相关各方面的工作界面，便于责任划分和落实"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-053",
    "number": 53,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "某信息系统应用软件的WBS分解结构图如下图，其中空白方框处应该填写的内容是（）",
    "options": [
      "产品需求",
      "需求规格说明书",
      "需求评审",
      "需求变更"
    ],
    "answer": "A",
    "analysis": "",
    "scored": true,
    "images": [
      "/project-management-images/question-053-1.png"
    ]
  },
  {
    "id": "pm-054",
    "number": 54,
    "module": "需求与范围管理",
    "type": "SINGLE_CHOICE",
    "stem": "（）不能作为检验 WBS 是否定义完全、项目的所有任务是否都被完全分解的依据。",
    "options": [
      "是否明确定义了每个任务的开始和结束",
      "是否每个任务都有一个可交互的结果",
      "是否容易估算成本",
      "是否明确了变更申请"
    ],
    "answer": "D",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-055",
    "number": 55,
    "module": "成本管理",
    "type": "SUBJECTIVE",
    "stem": "软件项目规模估算有WBS、（）（）（）",
    "options": [],
    "answer": "LOC估计 ； FP估计 ； PERT估计",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-056",
    "number": 56,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "软件项目需求开发的结果应该有项目视图和范围文档、用例文档、软件需求规格说明及相关分析模型。经评审批准，这些文档就定义了开发工作的需求基线，这个基线在客户和开发人员之间就构筑了计划产品( )的一个约定。",
    "options": [
      "功能需求和设计约束",
      "功能需求和非功能需求",
      "功能需求",
      "功能需求和用户需求"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-057",
    "number": 57,
    "module": "成本管理",
    "type": "SUBJECTIVE",
    "stem": "LOC可以分为（）和（）",
    "options": [],
    "answer": "无注释的源代码行 ； 注释的源代码行",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-058",
    "number": 58,
    "module": "成本管理",
    "type": "SUBJECTIVE",
    "stem": "简述软件项目的成本管理活动包含几个方面？",
    "options": [],
    "answer": "（1）软件系统规模估算 （2）软件项目成本估算 （3）软件项目成本预算制订 （4）软件项目成本监控",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-059",
    "number": 59,
    "module": "成本管理",
    "type": "SUBJECTIVE",
    "stem": "简述软件项目成本估算步骤。",
    "options": [],
    "answer": "1、建立目标； 2、规划需要的数据和资源； 3、确定软件需求； 4、拟定可行的细节； 5、运用多种独立的技术和原始资料； 6、比较并迭代各个估算值； 7、随访跟踪",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-060",
    "number": 60,
    "module": "成本管理",
    "type": "SUBJECTIVE",
    "stem": "在制订软件项目成本预算时，需要注意（）、（）、（）",
    "options": [],
    "answer": "资源计划的匹配 ； 预算的全面性 ； 预算的综合性",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-061",
    "number": 61,
    "module": "成本管理",
    "type": "SUBJECTIVE",
    "stem": "软件项目进度管理的过程包括活动定义、（）、（）、进度计划控制。",
    "options": [],
    "answer": "活动排序与历时估算 ； 制订进度计划",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-062",
    "number": 62,
    "module": "成本管理",
    "type": "SUBJECTIVE",
    "stem": "软件项目的成本估算方法有哪些？",
    "options": [],
    "answer": "",
    "analysis": "",
    "scored": false,
    "images": []
  },
  {
    "id": "pm-063",
    "number": 63,
    "module": "成本管理",
    "type": "SUBJECTIVE",
    "stem": "软件项目成本估算模型有哪些？",
    "options": [],
    "answer": "",
    "analysis": "",
    "scored": false,
    "images": []
  },
  {
    "id": "pm-064",
    "number": 64,
    "module": "成本管理",
    "type": "SUBJECTIVE",
    "stem": "怎样进行软件项目的成本估算，有哪些步骤？",
    "options": [],
    "answer": "",
    "analysis": "",
    "scored": false,
    "images": []
  },
  {
    "id": "pm-065",
    "number": 65,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "（）利用历史数据之间的统计关系和其他变量，来进行项目工作的成本估算。",
    "options": [
      "类比估算",
      "参数估算",
      "自下而上估算",
      "三点估算"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-066",
    "number": 66,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "成本预算的输入不包括（）。",
    "options": [
      "资源日历",
      "风险登记册",
      "协议",
      "成本基准"
    ],
    "answer": "D",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-067",
    "number": 67,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "控制成本过程输出，不包括（）。",
    "options": [
      "项目资金需求",
      "项目文件更新",
      "工作绩效信息",
      "成本预测"
    ],
    "answer": "A",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-068",
    "number": 68,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "关于成本估算的描述，正确的是（）。",
    "options": [
      "成本估算的准确度随着项目的进度而逐步降低",
      "成本类比估算是利用历史数据之间的统计关系和其他变量进行估算",
      "成本估算时需考虑应急储备，不用考虑管理储备",
      "成本估算时需要考虑项目成员学习所耗费的时间成本"
    ],
    "answer": "D",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-069",
    "number": 69,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "关于成本基准的描述，不正确的是( ）。",
    "options": [
      "大项目可能有多个成本基准",
      "成本基准的变更需要通过变更控制程序",
      "成本基准中既包括预计的支出，也包括预计的债务",
      "项目预算是成本基准与应急储备之和"
    ],
    "answer": "D",
    "analysis": "项目预算=成本基准+管理储备。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-070",
    "number": 70,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "下表给出了某项目到2018年12月30日为止的部分成本执行绩效数据。如果当前的成本偏差是非典型的，则完工估算（EAC）为（ ）元。",
    "options": [
      "45000",
      "40100",
      "42340",
      "47059"
    ],
    "answer": "C",
    "analysis": "BAC=40000，AC=16100， EV=1000+800+2000+5000+0.8*3200+0.6*4000=13760 EAC=(BAC-EV)+AC=42340",
    "scored": true,
    "images": [
      "/project-management-images/question-070-1.png"
    ]
  },
  {
    "id": "pm-071",
    "number": 71,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "某信息系统集成项目计划6周完成，项目经理就前4周的项目进展情况进行分析情况如下，项目的成本执行指数CPI为（）。",
    "options": [
      "0.83",
      "0.87",
      "0.88",
      "0.95"
    ],
    "answer": "A",
    "analysis": "前4周： AC=1000+2500+10000+15000=28500元 EV=1000+3000+8000+13000*0.9=23700元 CPI=EV/AC=23700/28500=0.832",
    "scored": true,
    "images": [
      "/project-management-images/question-071-1.png"
    ]
  },
  {
    "id": "pm-072",
    "number": 72,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "项目经理制定了项目资产负债表（单位：元)，如下表所示。该项目的静态投资回收期为（ ）。",
    "options": [
      "2",
      "2.4",
      "2.8",
      "3"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": [
      "/project-management-images/question-072-1.png",
      "/project-management-images/question-072-2.png"
    ]
  },
  {
    "id": "pm-073",
    "number": 73,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "某项工程的活动明细如下表（时间：周；费用：万元）：项目总预算由原先的60万元增加到63万元，根据下表，在预算约束下该工程最快能完成时间为9周，所需项目总费用为（）万元。",
    "options": [
      "60",
      "64",
      "56",
      "45"
    ],
    "answer": "A",
    "analysis": "A不赶工，BCD都赶工。 赶工成本：a15-10＝5、b17-15/2＝1、c13-12＝1、d11-8/2＝1.5 a成本较高，所以不选择压缩a，那么b可以压缩2天、c可以压缩1天、d可以压缩2天，总工期为a+b3+6＝9或者a+c+d3+3+3＝9，项目直接费用=10+17+13+11+19=51 项目间接费用＝1＊9＝9、项目总费用＝直接费用+间接费用＝51+9＝60",
    "scored": true,
    "images": [
      "/project-management-images/question-073-1.png"
    ]
  },
  {
    "id": "pm-074",
    "number": 74,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "某系统集成项目包含了三个软件模块，现在估算项目成本时，项目经理考虑到其中的模块A技术成熟，已在以前类似项目中多次使用并成功交付，所以项目经理忽略了A的开发成本，只给A预留了5万元，以防意外发生。然后估算了B的成本为50万元，C的成本为30万元，应急储备为10万元，三者集成成本为5万元，并预留了项目的10万元管理储备。如果你是项目组成员，该项目的成本基准是100万元，项目预算是（）万元",
    "options": [
      "90",
      "95",
      "100",
      "110"
    ],
    "answer": "D",
    "analysis": "总预算=成本基准+管理储备=100+10=110 万",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-075",
    "number": 75,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "项目经理制定了项目资产负债表（单位：元)，如下表所示。该项目的静态投资回收期为2.8，动态投资回收期为（ ）年（保留一位小数位）",
    "options": [
      "3",
      "3.4",
      "3.5",
      "3.6"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": [
      "/project-management-images/question-075-1.png",
      "/project-management-images/question-075-2.png"
    ]
  },
  {
    "id": "pm-076",
    "number": 76,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "某炼油厂根据计划每季度供应合同单位汽油和煤油各16吨。该厂从甲乙两处场地运回原油提炼。两处原油成分如下表所示，且甲乙两地采购成本分别为200元/吨和300元/吨。对于该炼油厂，需要从乙采购（）吨方能使此次采购的成本最低",
    "options": [
      "10",
      "20",
      "30",
      "40"
    ],
    "answer": "C",
    "analysis": "设从甲采购x吨，从乙采购y吨，成本最低，则： 0.2X+0.4Y＝16 0.5X+0.2Y＝16 X＝20 Y=30",
    "scored": true,
    "images": [
      "/project-management-images/question-076-1.png"
    ]
  },
  {
    "id": "pm-077",
    "number": 77,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "项目经理第一次承接移动端APP的软件开发项目，在做成本估算时，考虑了最不利的情况，估算出成本为90人日，最有利的情况下成本为45人日，公司的期望成本为60人日。基于贝塔分布的三点估算法，该项目的估算成本为（ ）人日。",
    "options": [
      "55",
      "50.5",
      "65",
      "62.5"
    ],
    "answer": "D",
    "analysis": "β公式（最乐观+最可能*4+最悲观）/6。（45+60*4+90）/6≈62.6",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-078",
    "number": 78,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "项目经理估算新开发产品的成本，最有可能情况下成本为17万元，最好情况下成本为15万元，最坏情况下成本为25万元，则该项目的预期成本为（ ）",
    "options": [
      "18",
      "19",
      "20",
      "21"
    ],
    "answer": "A",
    "analysis": "(15+17*4+25)/6=18",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-079",
    "number": 79,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "下表列出 A、B、C、D 四个项目的投资额及销售收入，根据投资回报率评估，应该选择投资（）",
    "options": [
      "A项目",
      "B项目",
      "C项目",
      "D项目"
    ],
    "answer": "C",
    "analysis": "销售收入/投资额 找最大的",
    "scored": true,
    "images": [
      "/project-management-images/question-079-1.png"
    ]
  },
  {
    "id": "pm-080",
    "number": 80,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目成本管理中，以下哪一项不属于直接成本？",
    "options": [
      "开发人员工资",
      "办公设备租赁费",
      "市场调研费用",
      "服务器购置费用"
    ],
    "answer": "C",
    "analysis": "直接成本是指可以直接归因于项目的成本，如开发人员工资、办公设备租赁费和服务器购置费用。市场调研费用通常被视为间接成本。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-081",
    "number": 81,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "在软件项目成本管理中，成本估算应该基于历史数据和专家判断。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "成本估算是软件项目成本管理的重要环节，通常需要参考历史数据和专家意见来提高准确性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-082",
    "number": 82,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目成本管理中，以下哪种方法不是常用的成本估算技术？",
    "options": [
      "类比估算",
      "参数估算",
      "蒙特卡洛模拟",
      "线性回归分析"
    ],
    "answer": "D",
    "analysis": "线性回归分析虽然是一种统计方法，但在软件项目成本管理中，更常用的是类比估算、参数估算和蒙特卡洛模拟等方法。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-083",
    "number": 83,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理中，成本控制的目标是确保项目在预算范围内完成。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "成本控制的主要目的是确保项目成本不超过预算，同时保证项目质量。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-084",
    "number": 84,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目成本管理中，以下哪个工具或技术不是用于成本控制？",
    "options": [
      "挣值管理",
      "成本绩效报告",
      "关键路径法",
      "趋势分析"
    ],
    "answer": "C",
    "analysis": "关键路径法主要用于进度管理，而不是成本控制。挣值管理、成本绩效报告和趋势分析都是成本控制中常用的工具和技术。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-085",
    "number": 85,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "在软件项目成本管理中，成本预算必须精确到每一项活动的具体成本。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "虽然成本预算需要尽量详细，但并不一定需要精确到每一项活动的具体成本。预算的细化程度取决于项目的规模和复杂性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-086",
    "number": 86,
    "module": "成本管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目成本管理中，以下哪一项不是成本控制的主要活动？",
    "options": [
      "监控成本偏差",
      "更新成本基准",
      "制定成本预算",
      "采取纠正措施"
    ],
    "answer": "C",
    "analysis": "制定成本预算是成本管理的一部分，但不是成本控制的主要活动。成本控制主要关注监控成本偏差、更新成本基准和采取纠正措施。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-087",
    "number": 87,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理的主要目的是为了控制项目的预算，以确保项目在预定的成本范围内完成。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "软件项目成本管理的核心是确保项目在预算范围内完成，这包括成本估算、预算制定和成本控制。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-088",
    "number": 88,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "在软件项目成本管理中，成本基准是项目成本的计划值，用于衡量项目绩效。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "成本基准是项目成本管理中的一个重要概念，它代表了项目成本的计划值，用于评估项目的实际成本表现。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-089",
    "number": 89,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理只关注项目的直接成本，而不考虑间接成本。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "软件项目成本管理不仅关注直接成本，也包括间接成本，因为这些成本同样影响项目的总成本。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-090",
    "number": 90,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "成本估算在软件项目成本管理中是可选的步骤，不是必须的。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "成本估算是软件项目成本管理中的关键步骤之一，它是制定成本基准的基础，因此是必须的。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-091",
    "number": 91,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理的目标是在保证项目质量的前提下，尽可能减少成本。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "软件项目成本管理不仅要控制成本，还要确保项目质量和进度，实现成本、质量和进度的平衡。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-092",
    "number": 92,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "在软件项目成本管理中，成本偏差分析可以帮助项目经理了解项目的成本状况，并采取相应的措施。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "成本偏差分析是软件项目成本管理的重要工具，它帮助项目经理识别成本超支或节约的情况，并采取相应措施。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-093",
    "number": 93,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理中的成本控制主要依赖于项目经理的经验，而不是系统的方法。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "虽然项目经理的经验很重要，但成本控制还需要依赖系统的方法和工具，如成本基准、成本估算和成本偏差分析等。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-094",
    "number": 94,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理中的成本预测是指对未来成本的估计，它基于历史数据和当前的项目状态。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "成本预测是软件项目成本管理中的重要环节，它基于历史数据和当前项目状态，对未来成本进行估计。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-095",
    "number": 95,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理中的成本估算需要考虑所有可能的成本因素，包括直接成本和间接成本。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "成本估算需要全面考虑所有可能的成本因素，包括直接成本和间接成本，以确保估算的准确性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-096",
    "number": 96,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理中的成本控制主要是通过定期的成本审计来实现的。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "成本控制不仅仅是通过成本审计来实现的，还包括成本估算、成本基准制定、成本监控等多个方面。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-097",
    "number": 97,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理中的成本基准一旦确定就不能更改。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "成本基准可以根据项目的实际情况进行调整，但这种调整需要经过严格的审批过程。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-098",
    "number": 98,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理中的成本估算通常采用自下而上的方法，即先估算各个活动的成本，再汇总到整个项目。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "自下而上的方法是软件项目成本估算中最常用的方法之一，它通过详细估算各个活动的成本，然后汇总到整个项目。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-099",
    "number": 99,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理中的成本控制主要是通过成本审计来实现的。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "成本控制不仅仅依靠成本审计，还包括成本估算、成本基准制定、成本监控等多个方面。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-100",
    "number": 100,
    "module": "成本管理",
    "type": "TRUE_FALSE",
    "stem": "软件项目成本管理中的成本预测需要考虑市场变化和技术进步等因素。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "成本预测需要考虑多种因素，包括市场变化和技术进步等，以提高预测的准确性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-101",
    "number": 101,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "在制订项目进度计划中，确定活动之间的关系非常重要，常用的关系有（）、（）和（）",
    "options": [],
    "answer": "强制依赖关系 ； 自由依赖关系 ； 外部依赖关系",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-102",
    "number": 102,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "对给定的软件项目绘制网络图，还需要对其进行优化，主要的优化方面有（）和（）。",
    "options": [],
    "answer": "时间优化 ； 时间-费用优化",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-103",
    "number": 103,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "简述用网络图安排进度的步骤。",
    "options": [],
    "answer": "（1）把项目分解为小的任务，确定任务之间的逻辑关系，即确定其先后次序； （2）确定任务持续时间、单位时间内资源需要量等基本数据； （3）绘制网络图，计算任务最早开始时间、最晚开始时间、最早结束时间和最晚结束时间，确定关键路径，得到初始进度计划方案。 （4）对初始方案进行调整和完善，得到优化的进度计划方案。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-104",
    "number": 104,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "项目的工期估算有哪些方式？",
    "options": [],
    "answer": "专家评审、模拟估算、定量型的基础工期估算、保留时间。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-105",
    "number": 105,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "软件项目计划的要素包括目标、合理的概念设计、（）、规模估计、（）和（）。",
    "options": [],
    "answer": "WBS ； 工作量估计 ； 项目进度安排",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-106",
    "number": 106,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "项目进度控制和监督的目的是（），以便当项目进展与项目计划出现严重偏差时可以采取适当的纠正或预防措施。",
    "options": [],
    "answer": "增强项目进度的透明度",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-107",
    "number": 107,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "某软件项目已经到了测试阶段，但是由于用户订购的硬件设备没有到货而不能实施测试。这种测试活动与硬件之间的依赖关系属于( )。",
    "options": [
      "强制性依赖关系",
      "直接依赖关系",
      "内部依赖关系",
      "外部依赖关系"
    ],
    "answer": "D",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-108",
    "number": 108,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在某个信息系统项目中，存在新老系统切换问题，在设置项目计划网络图时，新系统上线和老系统下线之间应设置成( )的关系。",
    "options": [
      "结束-开始（FS 型）",
      "结束-结束（FF 型）",
      "开始-结束（SF 型）",
      "开始-开始（SS 型）"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-109",
    "number": 109,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "（）不是规划项目进度管理的输入。",
    "options": [
      "项目范围说明书",
      "WBS和WBS字典",
      "活动清单",
      "项目章程"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-110",
    "number": 110,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在下面的项目网络图中（时间单位为天），活动B的自由时差和总时差分别为（）。",
    "options": [
      "0、0",
      "0、1",
      "1、0",
      "1、1"
    ],
    "answer": "B",
    "analysis": "工作B的总时差为：LSB-ESB=3-2=1（天） 工作B的自由时差为：ESC-EFB=5-5=0（天） 根据题意，在不延误项目工期的情况下，活动B最晚应在“第6天末结束”（即活动B的LF），注意，这是按照网络图的时间定义，按此定义，项目应在“第0天末开始”。提示：可以画时标网络图（以线段的长度表示时间）辅助思考。",
    "scored": true,
    "images": [
      "/project-management-images/question-110-1.png"
    ]
  },
  {
    "id": "pm-111",
    "number": 111,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "某项目各项工作的先后顺序及工作时间如下表所示，该项目的总工期为（）天",
    "options": [
      "31",
      "32",
      "33",
      "34"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": [
      "/project-management-images/question-111-1.png"
    ]
  },
  {
    "id": "pm-112",
    "number": 112,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "一个项目有三条关键路径与有一条关键路径相比，对项目有什么不同影响（ ）",
    "options": [
      "它使项目更易于管理",
      "它增加了项目风险",
      "它需要更多的人员",
      "这种情况是不可能的"
    ],
    "answer": "D",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-113",
    "number": 113,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "PERT",
    "options": [],
    "answer": "计划评审技术",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-114",
    "number": 114,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "用网络图分析法来进行进度安排，主要有哪些技术？",
    "options": [],
    "answer": "",
    "analysis": "",
    "scored": false,
    "images": []
  },
  {
    "id": "pm-115",
    "number": 115,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "软件项目进度管理的主要过程有哪些？",
    "options": [],
    "answer": "活动定义、活动安排与历时估计、制定进度计划、进度计划控制",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-116",
    "number": 116,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "用网络图分析法来进行进度安排，主要有哪些技术？",
    "options": [],
    "answer": "",
    "analysis": "",
    "scored": false,
    "images": []
  },
  {
    "id": "pm-117",
    "number": 117,
    "module": "进度与计划管理",
    "type": "SUBJECTIVE",
    "stem": "软件进度管理主要有什么方法？",
    "options": [],
    "answer": "",
    "analysis": "",
    "scored": false,
    "images": []
  },
  {
    "id": "pm-118",
    "number": 118,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目管理中，用于确定项目活动之间的依赖关系的技术是？",
    "options": [
      "关键路径法",
      "甘特图",
      "前导图技术",
      "计划评审技术"
    ],
    "answer": "C",
    "analysis": "前导图技术用于表示项目活动之间的依赖关系，包括FS（完成到开始）、SS（开始到开始）、FF（完成到完成）、SF（开始到完成）。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-119",
    "number": 119,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目进度监控中，哪种工具常用于跟踪项目的实际进度与计划进度的偏差？",
    "options": [
      "鱼骨图",
      "因果图",
      "S曲线",
      "帕累托图"
    ],
    "answer": "C",
    "analysis": "S曲线是一种常用的项目进度监控工具，它能够直观地展示项目的实际进度与计划进度之间的偏差。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-120",
    "number": 120,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目计划制定中，哪一项不是项目计划的主要组成部分？",
    "options": [
      "项目范围",
      "项目预算",
      "项目团队成员名单",
      "项目进度计划"
    ],
    "answer": "C",
    "analysis": "项目计划的主要组成部分包括项目范围、项目预算、项目进度计划等，但项目团队成员名单通常不作为主要组成部分。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-121",
    "number": 121,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目管理中，用于识别项目活动之间逻辑关系的技术是？",
    "options": [
      "关键路径法",
      "前导图技术",
      "计划评审技术",
      "甘特图"
    ],
    "answer": "B",
    "analysis": "前导图技术用于识别项目活动之间的逻辑关系，包括FS、SS、FF、SF等。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-122",
    "number": 122,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目进度监控中，哪种工具常用于展示项目的整体进度？",
    "options": [
      "鱼骨图",
      "因果图",
      "甘特图",
      "帕累托图"
    ],
    "answer": "C",
    "analysis": "甘特图是一种常用的项目进度监控工具，能够直观地展示项目的整体进度。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-123",
    "number": 123,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目计划制定中，哪一项不是项目计划的主要组成部分？",
    "options": [
      "项目范围",
      "项目预算",
      "项目质量标准",
      "项目进度计划"
    ],
    "answer": "C",
    "analysis": "项目计划的主要组成部分包括项目范围、项目预算、项目进度计划等，但项目质量标准通常不作为主要组成部分。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-124",
    "number": 124,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目管理中，用于估算项目活动持续时间的方法是？",
    "options": [
      "三点估算法",
      "头脑风暴法",
      "SWOT分析",
      "PEST分析"
    ],
    "answer": "A",
    "analysis": "三点估算法是一种常用的项目活动持续时间估算方法，通过乐观时间、最可能时间和悲观时间来估算。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-125",
    "number": 125,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目进度监控中，哪种方法可用于预测未来的项目绩效？",
    "options": [
      "挣值分析",
      "因果分析",
      "流程图",
      "控制图"
    ],
    "answer": "A",
    "analysis": "挣值分析是一种常用的项目进度监控方法，可用于预测未来的项目绩效。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-126",
    "number": 126,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "在项目管理中，关键路径法主要用于确定项目活动的顺序。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "关键路径法主要用于确定项目活动的历时和关键路径，而不是活动的顺序。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-127",
    "number": 127,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "在项目管理中，德尔菲法是一种常用的项目活动持续时间估算方法。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "德尔菲法是一种常用的项目活动持续时间估算方法，通过专家意见的迭代达成共识。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-128",
    "number": 128,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "在项目进度监控中，挣值分析可用于预测未来的项目绩效。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "挣值分析是一种常用的项目进度监控方法，可用于预测未来的项目绩效。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-129",
    "number": 129,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "在项目进度监控中，甘特图可以用来展示项目的整体进度。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "甘特图是一种常用的项目进度监控工具，能够直观地展示项目的整体进度。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-130",
    "number": 130,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目计划制定过程中，以下哪个工具最常用于估算项目活动的持续时间？",
    "options": [
      "甘特图",
      "关键路径法",
      "三点估算法",
      "工作分解结构"
    ],
    "answer": "C",
    "analysis": "三点估算法是一种常用的项目活动历时估计方法，它考虑了乐观时间、悲观时间和最可能时间。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-131",
    "number": 131,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目管理中，以下哪项技术最适合用于识别项目的关键路径？",
    "options": [
      "甘特图",
      "关键路径法",
      "工作分解结构",
      "PERT图"
    ],
    "answer": "B",
    "analysis": "关键路径法（Critical Path Method）用于识别项目的关键路径，即决定项目总工期的最长路径。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-132",
    "number": 132,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "PERT方法中，活动的历时估算公式为（乐观时间+4×最可能时间+悲观时间）/6。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "PERT三点估算法通过加权平均计算预期时间，公式正确。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-133",
    "number": 133,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "项目进度基线是项目计划批准后用于衡量实际进展的基准，不可随意修改。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "进度基线需通过正式变更流程调整，否则会失去监控依据。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-134",
    "number": 134,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "WBS（工作分解结构）是项目活动排序的直接输入。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "WBS明确了项目可交付成果，是定义活动及其依赖关系的基础。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-135",
    "number": 135,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "里程碑图仅用于展示项目关键节点，无法反映活动间的依赖关系。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "里程碑图显示重要事件的时间点，不体现活动逻辑关系。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-136",
    "number": 136,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "项目进度计划一旦获得批准，所有后续变更必须重新走完整审批流程。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "小范围变更可通过简化流程处理，重大变更才需完整审批。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-137",
    "number": 137,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "项目活动排序必须完全按照WBS的层次结构进行。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "WBS定义工作包，活动排序需根据逻辑关系调整，可能与WBS层级不完全一致。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-138",
    "number": 138,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "类比估算法适用于缺乏历史数据的新项目活动历时估算。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "类比估算依赖类似项目的经验数据，无历史数据时适用性差。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-139",
    "number": 139,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目中，活动排序的主要目的是为了确定？",
    "options": [
      "各项活动的资源分配方案",
      "活动之间的逻辑依赖关系",
      "每个活动的具体负责人",
      "活动所需的技术文档模板"
    ],
    "answer": "B",
    "analysis": "活动排序的核心目标是明确活动之间的先后逻辑关系，为后续进度计划奠定基础。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-140",
    "number": 140,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "使用三点估算法计算活动历时时，若最乐观时间为2天，最可能时间为4天，最悲观时间为9天，则预期历时为？",
    "options": [
      "4.0天",
      "4.5天",
      "5.0天",
      "5.5天"
    ],
    "answer": "B",
    "analysis": "三点估算公式：(最乐观+4×最可能+最悲观)/6 = (2+16+9)/6=27/6=4.5天",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-141",
    "number": 141,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目进度计划中，关键路径的特征是？",
    "options": [
      "浮动时间为正数",
      "包含高风险活动",
      "总浮动时间为零",
      "资源消耗最多"
    ],
    "answer": "C",
    "analysis": "关键路径是项目中总历时最长的路径，其总浮动时间为零，决定了项目最短工期。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-142",
    "number": 142,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "当项目进度延误时，以下哪种方法属于进度压缩技术？",
    "options": [
      "快速跟进",
      "资源平衡",
      "蒙特卡洛分析",
      "帕累托分析"
    ],
    "answer": "A",
    "analysis": "快速跟进是通过将顺序活动改为并行执行来压缩工期，是典型的进度压缩技术。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-143",
    "number": 143,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "甘特图可以直接显示活动之间的逻辑依赖关系。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "甘特图主要展示活动时间安排和进度状态，逻辑依赖关系需通过前导图或箭线图展示。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-144",
    "number": 144,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "资源平衡可能导致项目关键路径延长。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "资源平衡通过调整资源分配来缓解资源冲突，可能使原本非关键路径的活动成为新的关键路径。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-145",
    "number": 145,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "在项目执行阶段，进度基准线一旦确定就不可更改。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "当发生重大变更时，经变更控制流程批准后可以更新进度基准线。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-146",
    "number": 146,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "某功能模块的开发需要先完成需求分析，这种依赖关系属于？",
    "options": [
      "强制性依赖",
      "选择性依赖",
      "外部依赖",
      "内部依赖"
    ],
    "answer": "A",
    "analysis": "需求分析是开发的必要前提，属于基于技术要求的强制性依赖关系。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-147",
    "number": 147,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "当项目经理发现某个关键活动延误3天，首先应该？",
    "options": [
      "立即启动变更请求",
      "评估对项目整体进度的影响",
      "要求团队加班追赶进度",
      "调整后续活动顺序"
    ],
    "answer": "B",
    "analysis": "应先分析延误对关键路径和项目总工期的影响，再决定应对措施。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-148",
    "number": 148,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在项目进度监控中，挣值分析的进度偏差(SV)计算方式是？",
    "options": [
      "EV - PV",
      "EV - AC",
      "PV - EV",
      "AC - EV"
    ],
    "answer": "A",
    "analysis": "进度偏差SV=挣值(EV)-计划值(PV)，正值表示进度超前。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-149",
    "number": 149,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "项目进度网络图中，虚活动需要消耗时间和资源。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "虚活动仅用于表示逻辑关系，不消耗时间和资源。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-150",
    "number": 150,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "某项目采用关键链法，其核心特点是？",
    "options": [
      "设置项目缓冲区",
      "优化资源分配",
      "缩短关键路径",
      "增加并行活动"
    ],
    "answer": "A",
    "analysis": "关键链法通过设置项目缓冲区和接驳缓冲区来应对资源约束和不确定性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-151",
    "number": 151,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "在PERT分析中，β分布假设活动的历时估计具有对称性。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "PERT使用β分布，其特点是允许非对称分布，考虑最可能值偏离均值的情况。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-152",
    "number": 152,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "当项目实际进度落后于基准计划时，项目经理应首先查看？",
    "options": [
      "风险管理计划",
      "变更日志",
      "关键路径活动状态",
      "质量审计报告"
    ],
    "answer": "C",
    "analysis": "关键路径活动直接影响项目总工期，应优先评估其状态及影响范围。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-153",
    "number": 153,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "项目进度基准包含所有已批准的进度变更。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "进度基准是经批准的版本化计划，包含所有通过变更控制流程批准的调整。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-154",
    "number": 154,
    "module": "进度与计划管理",
    "type": "SINGLE_CHOICE",
    "stem": "在进度网络分析中，总浮动时间的计算方式是？",
    "options": [
      "LS - ES",
      "LF - EF",
      "ES - LS",
      "EF - LF"
    ],
    "answer": "A",
    "analysis": "总浮动时间=最晚开始时间(LS)-最早开始时间(ES)，表示活动可延迟的时间。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-155",
    "number": 155,
    "module": "进度与计划管理",
    "type": "TRUE_FALSE",
    "stem": "滚动式规划方法适用于项目初期详细计划难以制定的情况。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "滚动式规划采用渐进明细的方式，近期的计划详细，远期的计划保持概括性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-156",
    "number": 156,
    "module": "风险管理",
    "type": "SUBJECTIVE",
    "stem": "软件风险",
    "options": [],
    "answer": "软件风险是关于软件项目、软件开发过程和软件产品损失的可能性。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-157",
    "number": 157,
    "module": "风险管理",
    "type": "SUBJECTIVE",
    "stem": "风险识别方法于技术有哪些？",
    "options": [],
    "answer": "1、核对清单；2、头脑风暴法；3、匿名风险报告机制；4、Delphi法；5、SWOT分析法",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-158",
    "number": 158,
    "module": "风险管理",
    "type": "SUBJECTIVE",
    "stem": "风险跟踪的过程是什么？风险应对的策略有哪些？请结合你的项目经验，浅谈你是如何进行风险跟踪和应对的？",
    "options": [],
    "answer": "风险跟踪的过程包括监视风险设想、对比项目状态与风险阈值、风险信息的通知、报告风险度量。应对的策略有避免、转移、缓解、接受、研究、储备、退避。后面的内容同学们自己发挥。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-159",
    "number": 159,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "获得可以降低风险量的项目信息的最准确的方法是（）。",
    "options": [
      "采用头脑风暴技术识别风险",
      "利用以前类似项目的历史数据",
      "灵敏度分析",
      "Delphi技术"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-160",
    "number": 160,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "风险的三个属性是（ ）",
    "options": [
      "风险发生的时间、地点、负责人",
      "风险事件、时间、影响",
      "风险事件、概率、影响",
      "风险数量、风险影响程度、概率"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-161",
    "number": 161,
    "module": "风险管理",
    "type": "SUBJECTIVE",
    "stem": "风险分析",
    "options": [],
    "answer": "风险分析是分析每种风险可能发生的时间和概率，以评估项目可能结果的范围。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-162",
    "number": 162,
    "module": "风险管理",
    "type": "SUBJECTIVE",
    "stem": "简述风险应对策略。",
    "options": [],
    "answer": "避免；转移；缓解；接受；研究；储备；退避。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-163",
    "number": 163,
    "module": "风险管理",
    "type": "SUBJECTIVE",
    "stem": "举例说明回避风险的两种方式。",
    "options": [],
    "answer": "(1)主动与防风险是指从风险源入手，将风险来源彻底消除。例如修公路是，在交通拥挤或易发生事故的地段，为彻底消除隐患，可采取扩建路面，修建人行天桥或者禁止行人通行等措施。(2)完全放弃是另一种策略，虽然这种方法少见，例如，随着网络泡沫的破灭，许多母公司关闭了网站，这就是一种完全放弃的风险应对。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-164",
    "number": 164,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目风险管理中，风险三要素是指？",
    "options": [
      "概率、影响、可控性",
      "时间、成本、范围",
      "人员、技术、流程",
      "识别、分析、应对"
    ],
    "answer": "A",
    "analysis": "风险三要素包括风险发生的概率、风险造成的影响以及风险的可控性，这是风险概述中的核心概念。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-165",
    "number": 165,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪种方法属于风险识别阶段的常用技术？",
    "options": [
      "德尔菲法",
      "蒙特卡洛模拟",
      "挣值分析",
      "关键路径法"
    ],
    "answer": "A",
    "analysis": "德尔菲法通过专家匿名反馈进行风险识别，属于典型的风险识别技术。蒙特卡洛模拟属于定量风险分析工具。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-166",
    "number": 166,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在风险分析过程中，使用概率影响矩阵的主要目的是？",
    "options": [
      "对风险进行优先级排序",
      "计算风险应对成本",
      "制定风险应对计划",
      "验证风险控制效果"
    ],
    "answer": "A",
    "analysis": "概率影响矩阵通过评估风险发生概率和影响程度，帮助确定风险处理的优先级顺序，属于定性风险分析的核心工具。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-167",
    "number": 167,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "当项目团队决定购买保险来转移技术方案失败的风险时，这属于哪种风险应对策略？",
    "options": [
      "风险转移",
      "风险规避",
      "风险减轻",
      "风险接受"
    ],
    "answer": "A",
    "analysis": "通过第三方（保险公司）承担风险后果属于典型的转移策略，这是风险跟踪与应对阶段的重要决策。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-168",
    "number": 168,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "风险管理验证活动通常不包括以下哪项内容？",
    "options": [
      "审查风险登记册完整性",
      "评估风险应对措施有效性",
      "审计风险管理过程合规性",
      "更新项目进度基准"
    ],
    "answer": "A",
    "analysis": "更新进度基准属于进度管理范畴，与风险管理验证无关。验证活动聚焦风险过程本身的完整性和有效性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-169",
    "number": 169,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "当项目团队决定购买保险来转移潜在损失时，这属于哪种风险应对策略？",
    "options": [
      "风险规避",
      "风险转移",
      "风险减轻",
      "风险接受"
    ],
    "answer": "B",
    "analysis": "购买保险是将风险后果转移给第三方的典型风险转移策略。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-170",
    "number": 170,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险阈值是组织对可接受风险水平的定量描述。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险阈值定义了组织在风险承受能力范围内的量化指标界限。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-171",
    "number": 171,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目管理中，哪一项是用于识别潜在风险的过程？",
    "options": [
      "需求分析",
      "风险识别",
      "质量保证",
      "配置管理"
    ],
    "answer": "B",
    "analysis": "风险识别是风险管理的重要环节，旨在发现可能影响项目的潜在风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-172",
    "number": 172,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪项不属于风险分析的方法？",
    "options": [
      "故障树分析",
      "决策树分析",
      "SWOT分析",
      "需求评审"
    ],
    "answer": "D",
    "analysis": "需求评审主要用于需求阶段的质量控制，而不是风险分析的方法。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-173",
    "number": 173,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在风险管理过程中，哪一步骤涉及监控风险并评估其状态？",
    "options": [
      "风险识别",
      "风险分析",
      "风险跟踪与应对",
      "风险管理验证"
    ],
    "answer": "C",
    "analysis": "风险跟踪与应对是指持续监控风险的状态，并采取相应的措施来应对风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-174",
    "number": 174,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪项不是风险管理验证的目的？",
    "options": [
      "确认风险管理过程的有效性",
      "评估风险管理策略的效果",
      "确定项目进度",
      "确保风险管理活动符合标准"
    ],
    "answer": "C",
    "analysis": "确定项目进度属于项目计划的一部分，而非风险管理验证的目的。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-175",
    "number": 175,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目管理中，哪一项描述了风险概述的主要作用？",
    "options": [
      "详细列出所有可能的风险",
      "提供项目整体风险状况的概览",
      "制定具体的应对措施",
      "记录风险管理过程中的所有活动"
    ],
    "answer": "B",
    "analysis": "风险概述提供了项目整体风险状况的概览，帮助管理者了解项目面临的主要风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-176",
    "number": 176,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险识别是风险管理的第一步，它主要目的是发现潜在的风险因素。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险识别确实是风险管理的第一步，其主要目的是发现潜在的风险因素。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-177",
    "number": 177,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险分析包括定性和定量两种方法，用于评估风险的影响程度。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险分析确实包括定性和定量两种方法，用于评估风险的影响程度。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-178",
    "number": 178,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险跟踪与应对主要是指在项目执行过程中持续监控风险，并采取相应措施。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险跟踪与应对确实是在项目执行过程中持续监控风险，并采取相应措施。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-179",
    "number": 179,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险管理验证是为了确保风险管理过程的有效性和完整性。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险管理验证是为了确保风险管理过程的有效性和完整性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-180",
    "number": 180,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险概述通常会详细列出所有可能的风险及其应对措施。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "风险概述通常不会详细列出所有可能的风险及其应对措施，而是提供项目整体风险状况的概览。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-181",
    "number": 181,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪一项不属于风险跟踪与应对的活动？",
    "options": [
      "定期审查风险状态",
      "更新风险登记册",
      "制定新的项目计划",
      "实施风险应对措施"
    ],
    "answer": "C",
    "analysis": "制定新的项目计划不属于风险跟踪与应对的活动。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-182",
    "number": 182,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在风险管理中，哪一种方法可以用来评估风险发生的概率和影响？",
    "options": [
      "头脑风暴法",
      "风险矩阵",
      "德尔菲法",
      "蒙特卡洛模拟"
    ],
    "answer": "B",
    "analysis": "风险矩阵是一种常用的方法，用于评估风险发生的概率和影响。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-183",
    "number": 183,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在风险管理验证中，哪一项不是其关注的重点？",
    "options": [
      "风险管理过程的有效性",
      "风险管理策略的效果",
      "项目团队成员的技能水平",
      "风险管理活动的合规性"
    ],
    "answer": "C",
    "analysis": "项目团队成员的技能水平不是风险管理验证的关注重点。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-184",
    "number": 184,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "风险概述通常由谁负责编制？",
    "options": [
      "项目经理",
      "项目团队成员",
      "客户代表",
      "外部顾问"
    ],
    "answer": "A",
    "analysis": "风险概述通常由项目经理负责编制。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-185",
    "number": 185,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目管理中，哪一项描述了风险识别的主要目标？",
    "options": [
      "制定详细的应对措施",
      "发现潜在的风险因素",
      "评估风险的影响程度",
      "监控风险的状态"
    ],
    "answer": "B",
    "analysis": "风险识别的主要目标是发现潜在的风险因素。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-186",
    "number": 186,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险分析可以帮助项目团队更好地理解风险的影响和可能性。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险分析确实可以帮助项目团队更好地理解风险的影响和可能性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-187",
    "number": 187,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险跟踪与应对需要项目团队持续地监控风险，并及时调整应对措施。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险跟踪与应对确实需要项目团队持续地监控风险，并及时调整应对措施。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-188",
    "number": 188,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险管理验证是为了确保风险管理过程的完整性和有效性。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险管理验证确实是为了确保风险管理过程的完整性和有效性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-189",
    "number": 189,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在进行风险分析时，下列哪个工具或技术最常被用来评估风险的影响？",
    "options": [
      "甘特图",
      "CPM图",
      "PERT图",
      "鱼骨图"
    ],
    "answer": "D",
    "analysis": "鱼骨图是一种常用的工具，用于评估风险的影响及其概率。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-190",
    "number": 190,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目管理中，风险跟踪的主要目的是什么？",
    "options": [
      "确定项目的预算",
      "监控风险的状态并采取行动",
      "制定详细的项目计划",
      "评估团队成员的能力"
    ],
    "answer": "B",
    "analysis": "风险跟踪是为了监控风险的状态，并根据需要采取相应的措施。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-191",
    "number": 191,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目管理中，哪一种方法可用于识别项目的风险？",
    "options": [
      "头脑风暴",
      "成本效益分析",
      "关键路径法",
      "挣值分析"
    ],
    "answer": "A",
    "analysis": "头脑风暴是一种常用的方法，用于识别项目的风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-192",
    "number": 192,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目管理中，哪一种文档通常用于记录风险及其应对策略？",
    "options": [
      "需求规格说明书",
      "风险登记册",
      "项目计划书",
      "测试计划书"
    ],
    "answer": "B",
    "analysis": "风险登记册是记录风险及其应对策略的文档。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-193",
    "number": 193,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在软件项目管理中，哪一种方法可用于识别项目的风险？",
    "options": [
      "德尔菲法",
      "关键路径法",
      "挣值分析",
      "因果分析"
    ],
    "answer": "A",
    "analysis": "德尔菲法是一种常用的方法，用于识别项目的风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-194",
    "number": 194,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在进行风险分析时，下列哪种方法可用于评估风险的概率和影响？",
    "options": [
      "SWOT分析",
      "决策树分析",
      "因果分析",
      "鱼骨图分析"
    ],
    "answer": "B",
    "analysis": "决策树分析是一种评估风险概率和影响的方法，通过构建决策树来分析不同的可能性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-195",
    "number": 195,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在风险识别阶段，项目经理发现团队成员对风险的理解存在较大差异，此时最应该采用的方法是？",
    "options": [
      "使用德尔菲技术统一专家意见",
      "直接采用历史项目风险清单",
      "增加项目预算规避风险",
      "跳过风险识别直接进入分析"
    ],
    "answer": "A",
    "analysis": "德尔菲技术通过匿名多轮征询专家意见可有效统一认知差异，属于风险识别的典型方法。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-196",
    "number": 196,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "当项目出现'第三方接口延迟交付'风险时，采用提前与供应商签订惩罚条款的方式属于：",
    "options": [
      "风险规避",
      "风险转移",
      "风险减轻",
      "风险接受"
    ],
    "answer": "B",
    "analysis": "通过合同条款将风险后果转移给第三方，属于典型的风险转移策略。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-197",
    "number": 197,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "进行风险数据质量评估时，最需要关注的是：",
    "options": [
      "风险数量的多少",
      "数据的准确性、可靠性和完整性",
      "风险管理计划的格式",
      "团队成员的职务等级"
    ],
    "answer": "B",
    "analysis": "数据质量评估重点验证风险信息的可信度、精确度和完整程度，属于风险分析的基础工作。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-198",
    "number": 198,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在敏捷项目中，最适合进行风险管理验证的时机是：",
    "options": [
      "仅在产品发布时",
      "每个迭代的评审会议",
      "项目启动会议",
      "年度战略规划时"
    ],
    "answer": "B",
    "analysis": "敏捷项目通过迭代评审持续验证风险应对效果，符合持续改进原则。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-199",
    "number": 199,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "某项目风险登记册中'客户需求变更频繁'被标记为深红色，这说明该风险：",
    "options": [
      "发生概率低但影响大",
      "发生概率高且影响大",
      "已被成功消除",
      "属于机会型风险"
    ],
    "answer": "B",
    "analysis": "风险矩阵中深红色通常代表高概率高影响的风险，需要优先处理。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-200",
    "number": 200,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "SWOT分析既可以识别威胁也可以发现机会，因此属于全面的风险识别技术。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "SWOT分析通过评估优势、劣势、机会和威胁四个维度进行全面识别。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-201",
    "number": 201,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "蒙特卡洛分析属于定性风险分析方法的典型代表。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "蒙特卡洛分析通过模拟计算风险影响的数值范围，属于定量分析方法。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-202",
    "number": 202,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险审计报告应作为配置项纳入项目知识库管理。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险审计成果属于组织过程资产，需要系统化保存以供后续项目参考。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-203",
    "number": 203,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "当风险触发阈值达到预设临界点时，应自动启动应急储备金使用流程。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "设置风险阈值并关联应急响应机制是风险跟踪的重要控制手段。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-204",
    "number": 204,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险登记册在项目执行过程中需要持续更新，直到项目收尾阶段才最终定稿。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "风险登记册是动态文件，需随项目进展不断更新维护，属于持续跟踪的要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-205",
    "number": 205,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "开发团队采用结对编程降低代码缺陷率，这属于哪种风险应对策略？",
    "options": [
      "风险减轻",
      "风险转移",
      "风险规避",
      "风险接受"
    ],
    "answer": "A",
    "analysis": "通过改进工作方法降低风险发生概率或影响属于典型的风险减轻。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-206",
    "number": 206,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "进行风险优先级排序时，最合适的工具是：",
    "options": [
      "帕累托图",
      "鱼骨图",
      "概率影响矩阵",
      "控制图"
    ],
    "answer": "C",
    "analysis": "概率影响矩阵通过综合评估发生概率和影响程度确定风险优先级。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-207",
    "number": 207,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "在风险管理验证过程中，发现某个已关闭风险重新出现，首先应该：",
    "options": [
      "修改原始风险记录",
      "重新启动风险应对流程",
      "追究相关人员责任",
      "降低项目管理标准"
    ],
    "answer": "B",
    "analysis": "风险再发生说明应对措施不充分，需要重新评估并启动应对流程。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-208",
    "number": 208,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险分解结构(RBS)按照风险来源进行分类管理，有助于提高识别效率。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "RBS通过结构化分类帮助系统识别各领域的潜在风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-209",
    "number": 209,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险紧迫性评估只需要考虑时间维度上的临近程度。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "紧迫性评估需综合时间敏感性和风险应对窗口期等多重因素。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-210",
    "number": 210,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "项目进行到中期时，应该重点验证：",
    "options": [
      "风险管理计划的完整性",
      "残余风险和次生风险",
      "项目章程的合规性",
      "团队成员的考勤记录"
    ],
    "answer": "B",
    "analysis": "项目中期需要特别关注已实施应对措施后剩余的残余风险和新产生的次生风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-211",
    "number": 211,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险数据质量评估属于定量分析的必要前提工作。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "定量分析需要准确可靠的数据支持，因此必须先行验证数据质量。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-212",
    "number": 212,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "当项目出现未知风险时，最应该参考：",
    "options": [
      "工作分解结构",
      "应急管理储备",
      "质量管理计划",
      "沟通管理矩阵"
    ],
    "answer": "B",
    "analysis": "应急储备专门用于应对未知-未知风险，属于风险跟踪的应对资源。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-213",
    "number": 213,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险核对单需要根据项目类型定制化开发，不能直接套用组织模板。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "不同项目类型的风险特征差异较大，需要针对性调整核对单内容。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-214",
    "number": 214,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "以下哪种情况表明风险管理过程需要改进？",
    "options": [
      "风险应对措施按期完成",
      "次生风险数量持续增加",
      "风险登记册及时更新",
      "定期召开风险评审会议"
    ],
    "answer": "B",
    "analysis": "次生风险增多说明应对措施可能产生负面效果，反映过程存在缺陷需要改进。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-215",
    "number": 215,
    "module": "风险管理",
    "type": "TRUE_FALSE",
    "stem": "风险应对责任人变更后，需要在24小时内更新风险登记册。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "责任主体变更直接影响风险监控有效性，属于必须及时更新的关键信息。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-216",
    "number": 216,
    "module": "风险管理",
    "type": "SINGLE_CHOICE",
    "stem": "配置管理系统通常由( )组成。",
    "options": [
      "动态库、静态库和产品库",
      "开发库、备份库和产品库",
      "动态库、主库和产品库",
      "主库、受控库和产品库"
    ],
    "answer": "C",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-217",
    "number": 217,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "CASE",
    "options": [],
    "answer": "计算机辅助软件工程",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-218",
    "number": 218,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "CMM",
    "options": [],
    "answer": "软件成熟度模型",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-219",
    "number": 219,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "基线",
    "options": [],
    "answer": "基线是软件开发过程中的特定点，其作用是使软件项目各个阶段的划分更加明确，使本来连续的工作在这些点上断开，以便于检查和肯定阶段的成果。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-220",
    "number": 220,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "软件项目配置管理由（）、（）、变更控制委员会承担。",
    "options": [],
    "answer": "配置经理 ； 模块主管",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-221",
    "number": 221,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "简述软件配置管理过程。",
    "options": [],
    "answer": "计划配置管理、开发配置管理、配置控制、状态审计。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-222",
    "number": 222,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "软件配置管理",
    "options": [],
    "answer": "软件配置管理是应用于由软件组成的系统的配置管理。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-223",
    "number": 223,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "软件配置管理的定义。",
    "options": [],
    "answer": "软件配置管理是软件项目运作的一个支撑平台，它将项目干系人的工作协同起来，实现高效的团队沟通，使工作成果及时共享。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-224",
    "number": 224,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "软件配置管理过程分为计划配置管理、（）、（）、（）。",
    "options": [],
    "answer": "开发配置管理方案 ； 配置控制 ； 状态审计",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-225",
    "number": 225,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "CMM",
    "options": [],
    "answer": "软件成熟度模型",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-226",
    "number": 226,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "配置标识",
    "options": [],
    "answer": "唯一地标识软件配置项，使它们可通过某种方式访问。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-227",
    "number": 227,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "典型的变更控制流程包括变更请求、（）、（）、（）及核实变更结果等步骤。",
    "options": [],
    "answer": "变更验证 ； 变更评审 ； 变更实施",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-228",
    "number": 228,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "简述配置审核的形式。",
    "options": [],
    "answer": "过程审核、功能审核、物理审核、质量系统审核。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-229",
    "number": 229,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "软件复用",
    "options": [],
    "answer": "软件复用是在软件开发中避免重复劳动的解决方案，其出发点是软件项目的开发不再采用一切“从零开始”的模式，而是以已有的工作为基础，充分利用过去项目开发中积累的知识和经验，将开发的重点集中于项目的特有构成成分。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-230",
    "number": 230,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "简述软件复用及其方式。",
    "options": [],
    "answer": "软件复用是在软件开发中避免重复劳动的解决方案，其出发点是软件项目的开发不再采用一切“从零开始”的模式，而是以已有的工作为基础，充分利用过去项目开发中积累的知识和经验，将开发的重点集中于项目的特有构成成分。软件复用主要有源代码复用；目标代码复用；设计结果复用；分析结果复用；类模块复用。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-231",
    "number": 231,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "构件",
    "options": [],
    "answer": "软件系统中可以明确辨识的构成成分。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-232",
    "number": 232,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "基线管理具有两个基本功能，即（）和（）。",
    "options": [],
    "answer": "基线控制 ； 提供服务",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-233",
    "number": 233,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "软件配置管理的文件体系有方针、（）、和（）",
    "options": [],
    "answer": "过程定义 ； 规程或模板",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-234",
    "number": 234,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "小粒度复用",
    "options": [],
    "answer": "软件小规模复用",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-235",
    "number": 235,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "在CMMI模型中，配置管理过程域的主要目标是？",
    "options": [
      "确保项目成果物的完整性和可追溯性",
      "提高软件开发团队的生产效率",
      "优化项目风险管理流程",
      "统一项目进度报告格式"
    ],
    "answer": "A",
    "analysis": "CMMI配置管理的核心目标是通过标识、控制、记录配置项变更，确保工作产品的完整性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-236",
    "number": 236,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "配置管理计划中必须明确的内容不包括？",
    "options": [
      "配置项的命名规范",
      "项目预算分配细则",
      "变更控制流程",
      "配置审核周期"
    ],
    "answer": "B",
    "analysis": "预算分配属于项目管理计划范畴，不属于配置管理计划的核心内容。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-237",
    "number": 237,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "进行物理配置审核时，主要验证的是？",
    "options": [
      "配置项与设计文档的一致性",
      "交付成果的实际存在性和完整性",
      "配置管理流程合规性",
      "变更请求的合理性"
    ],
    "answer": "B",
    "analysis": "物理配置审核侧重检查交付物是否真实存在且完整，区别于逻辑审核的内容一致性验证。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-238",
    "number": 238,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "基于构件的配置管理最大优势体现在？",
    "options": [
      "降低测试用例编写难度",
      "提升构件的复用性和系统扩展性",
      "简化需求分析过程",
      "减少文档编写工作量"
    ],
    "answer": "B",
    "analysis": "构件化管理通过标准化接口和版本控制，有效提升组件复用率和系统模块化程度。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-239",
    "number": 239,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪项属于配置标识活动？",
    "options": [
      "建立配置库目录结构",
      "审查变更影响范围",
      "生成配置状态报告",
      "验证测试覆盖率"
    ],
    "answer": "A",
    "analysis": "配置标识包括定义配置项、命名规则和存储结构，属于配置管理的基础工作。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-240",
    "number": 240,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "在配置管理策划阶段，确定配置项粒度的原则是？",
    "options": [
      "尽可能细化到函数级别",
      "根据项目规模和变更频率平衡",
      "统一采用模块级管理",
      "完全由开发人员自主决定"
    ],
    "answer": "B",
    "analysis": "配置项粒度需要平衡管理成本与变更控制需求，过大过小都会影响管理效率。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-241",
    "number": 241,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "配置基线建立后，正确的变更处理流程是？",
    "options": [
      "直接修改→补充文档→通知相关方",
      "创建变更请求→影响分析→CCB审批→实施变更",
      "测试环境验证→生产环境部署→更新文档",
      "开发人员自主决定→记录变更日志"
    ],
    "answer": "B",
    "analysis": "规范的变更控制流程必须包含请求、分析、审批、实施等关键环节，确保变更受控。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-242",
    "number": 242,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪种情况需要进行配置审核？",
    "options": [
      "每月项目进度汇报时",
      "产品发布前确认版本完整性",
      "编写用户手册过程中",
      "日常代码提交时"
    ],
    "answer": "B",
    "analysis": "产品发布属于关键节点，必须通过配置审核确保交付物符合既定标准和要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-243",
    "number": 243,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "构件依赖管理在基于构件的配置管理中主要用于？",
    "options": [
      "降低开发人员技能要求",
      "解决版本兼容性问题",
      "缩短需求分析周期",
      "简化测试用例设计"
    ],
    "answer": "B",
    "analysis": "依赖管理能有效跟踪构件版本间的兼容关系，避免因版本冲突导致系统故障。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-244",
    "number": 244,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "配置状态统计报告通常不包含？",
    "options": [
      "变更请求处理状态",
      "配置项版本演进历史",
      "系统架构设计原理",
      "基线发布记录"
    ],
    "answer": "C",
    "analysis": "架构设计原理属于技术文档范畴，不属于配置状态统计需要跟踪的内容。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-245",
    "number": 245,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "在CMMI二级（已管理级）中，配置管理的关键特征是？",
    "options": [
      "建立了标准化的配置管理流程",
      "实现了自动化部署工具",
      "完成所有构件的形式化验证",
      "采用敏捷配置管理方法"
    ],
    "answer": "A",
    "analysis": "CMMI二级要求过程被定义、文档化并制度化执行，这是与一级的本质区别。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-246",
    "number": 246,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "配置库中工作空间（workspace）的主要作用是？",
    "options": [
      "存储最终发布版本",
      "提供开发人员的私有编辑区域",
      "记录所有变更审计日志",
      "备份历史版本数据"
    ],
    "answer": "B",
    "analysis": "工作空间为开发人员提供隔离的修改环境，避免直接修改共享库影响他人工作。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-247",
    "number": 247,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "当发现配置项版本与需求文档不一致时，首先应该？",
    "options": [
      "立即修正代码匹配文档",
      "发起变更控制流程",
      "更新文档适应现有代码",
      "记录问题待下次迭代处理"
    ],
    "answer": "B",
    "analysis": "任何不一致都应通过正式的变更控制流程处理，确保变更的规范性和可追溯性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-248",
    "number": 248,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "构件注册库在基于构件的开发中的主要功能是？",
    "options": [
      "存储第三方许可证信息",
      "提供构件的元数据管理和检索服务",
      "监控运行时性能指标",
      "生成自动化测试报告"
    ],
    "answer": "B",
    "analysis": "注册库通过元数据管理实现构件的分类存储、版本控制和查询检索功能。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-249",
    "number": 249,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "配置管理计划应何时首次制定？",
    "options": [
      "需求分析阶段启动时",
      "系统设计完成后",
      "编码开始前一周",
      "首次迭代结束时"
    ],
    "answer": "A",
    "analysis": "配置管理计划应在项目早期制定，通常与项目管理计划同步开展。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-250",
    "number": 250,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪项不属于配置控制活动？",
    "options": [
      "版本发布审批",
      "变更影响分析",
      "配置项状态跟踪",
      "编写单元测试用例"
    ],
    "answer": "D",
    "analysis": "单元测试属于开发活动，不属于配置控制的范畴。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-251",
    "number": 251,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "逻辑配置审核重点检查的是？",
    "options": [
      "存储介质物理安全性",
      "配置项功能符合性",
      "备份策略有效性",
      "访问权限设置合理性"
    ],
    "answer": "B",
    "analysis": "逻辑审核验证配置项的功能、性能等逻辑属性是否符合需求规格。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-252",
    "number": 252,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "构件版本演化的管理策略应当包括？",
    "options": [
      "强制使用最新版本",
      "兼容旧版本数据格式",
      "明确定义版本兼容规则",
      "限制版本回退操作"
    ],
    "answer": "C",
    "analysis": "清晰的版本兼容规则是构件化系统可持续集成的关键保障。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-253",
    "number": 253,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "配置管理工具的基本功能不包括？",
    "options": [
      "版本分支管理",
      "自动化需求优先级排序",
      "差异比较",
      "访问权限控制"
    ],
    "answer": "B",
    "analysis": "需求优先级排序属于需求管理工具功能，与配置管理工具定位不同。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-254",
    "number": 254,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "在敏捷项目中实施配置管理时，应特别注意？",
    "options": [
      "延长变更审批流程",
      "加强持续集成与自动化",
      "取消配置基线",
      "减少版本标签使用"
    ],
    "answer": "B",
    "analysis": "敏捷环境需通过自动化手段实现高频变更下的配置管理，保持快速可靠交付。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-255",
    "number": 255,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "软件配置管理仅需关注代码文件的版本控制。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "软件配置管理的对象包括代码、文档、工具、环境等所有配置项。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-256",
    "number": 256,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "基线是经过正式评审并同意作为后续工作基础的一组配置项。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "基线定义强调通过正式评审和稳定性，是配置管理的核心概念。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-257",
    "number": 257,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "配置管理员无需参与变更控制委员会（CCB）的决策过程。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "配置管理员负责执行变更流程，需向CCB提供配置状态信息以支持决策。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-258",
    "number": 258,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "配置状态报告仅用于记录当前代码版本信息。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "配置状态报告需包含所有配置项的变更历史、基线状态及问题跟踪信息。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-259",
    "number": 259,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "版本控制工具（如Git）的标签（Tag）功能可用于标识基线。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "标签功能可固定特定版本，符合基线不可修改的特性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-260",
    "number": 260,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "在CMMI成熟度模型中，配置管理属于过程管理类别的特定实践。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "CMMI中配置管理属于支持过程域，而非过程管理类别。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-261",
    "number": 261,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "配置审核仅需在项目结束时执行一次即可。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "配置审核应贯穿项目生命周期，包括物理审核和功能审核。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-262",
    "number": 262,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "开发人员可直接修改已纳入基线的配置项而无需申请变更。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "基线配置项的修改必须通过变更控制流程审批。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-263",
    "number": 263,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "配置管理库的权限分配应允许所有项目成员自由修改所有文件。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "权限需按角色分配，例如开发人员仅可修改工作库中的非基线内容。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-264",
    "number": 264,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "配置项的标识符应包含其类型、版本及所属模块信息。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "明确的标识规则有助于快速定位和管理配置项。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-265",
    "number": 265,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "软件配置管理计划无需包含备份与恢复策略。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "备份与恢复是配置管理计划中保障数据安全性的必要内容。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-266",
    "number": 266,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "变更请求被拒绝后，相关记录可立即删除以节省存储空间。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "所有变更请求无论结果均需保留，作为配置状态报告的组成部分。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-267",
    "number": 267,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "功能配置审核用于验证配置项是否符合设计要求。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "功能审核关注配置项的实际功能与需求的符合性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-268",
    "number": 268,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "配置管理工具的选择应优先考虑功能复杂性而非团队适应性。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "工具需平衡功能完备性与团队使用成本，避免过度复杂。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-269",
    "number": 269,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "在敏捷项目中，配置管理可以完全依赖开发人员的自觉性。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "敏捷项目仍需通过自动化工具和流程确保配置管理的规范性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-270",
    "number": 270,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "配置项的版本号格式必须遵循‘主版本.次版本.修订号’的规则。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "版本号规则可根据项目自定义，但需在配置管理计划中明确定义。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-271",
    "number": 271,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "物理配置审核主要检查配置项的存储位置是否符合要求。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "物理审核关注配置项的实际存储状态与记录的匹配性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-272",
    "number": 272,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "CMMI Level 2中要求组织级配置管理流程标准化。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "CMMI Level 2要求项目级配置管理，Level 3才要求组织级标准化。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-273",
    "number": 273,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "配置管理库中的受控库用于存放正在开发的配置项草稿。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "受控库存放已基线化的配置项，草稿应存放在开发库或工作库中。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-274",
    "number": 274,
    "module": "配置与变更管理",
    "type": "TRUE_FALSE",
    "stem": "配置管理活动应在项目启动阶段结束后才开始执行。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "配置管理需从项目启动阶段即开始规划并实施。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-275",
    "number": 275,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "根据《信息技术软件工程术语》(GB/T 11457)，配置项（CI）是指（ ）",
    "options": [
      "仅软件系统中的可执行代码和文档",
      "为配置管理设计的硬件、软件或两者的集合，作为单个实体管理",
      "项目开发过程中的所有文档和数据",
      "基线配置项与非基线配置项的统称"
    ],
    "answer": "B",
    "analysis": "根据原文定义，配置项是 “为配置管理设计的硬件、软件或两者的集合，它在配置管理过程中作为一单个实体来对待”，选项 B 直接对应这一定义。其他选项中，A 缩小了范围（不仅限于软件），C 未提及 “配置管理” 核心，D 是配置项的分类而非定义，均不正确。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-276",
    "number": 276,
    "module": "配置与变更管理",
    "type": "SINGLE_CHOICE",
    "stem": "人力资源分配图是 （ ）",
    "options": [
      "展现目前的人力资源质量",
      "展现项目中人力资源在各个阶段的分布情况",
      "说明人员分工情况",
      "说明项目需要的所有资源。"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-277",
    "number": 277,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "简述软件资源的复用方式。",
    "options": [],
    "answer": "源代码复用；目标代码复用；设计结果复用；分析结果复用；类模块复用。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-278",
    "number": 278,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "软件项目中的硬件资源包括哪些？",
    "options": [],
    "answer": "宿主机、目标机、其他硬件设备。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-279",
    "number": 279,
    "module": "配置与变更管理",
    "type": "SUBJECTIVE",
    "stem": "硬件设备的经济管理包括哪两项具体内容。",
    "options": [],
    "answer": "硬件设备的计价，硬件设备的折旧。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-280",
    "number": 280,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "在CMMI模型中，以下哪项是人力资源管理的关键实践？",
    "options": [
      "定义角色和职责",
      "部署自动化测试工具",
      "设计服务器冗余架构",
      "编写代码规范文档"
    ],
    "answer": "A",
    "analysis": "CMMI的人力资源管理强调明确团队成员的角色和职责（选项A）。选项B属于软件资源管理，选项C属于硬件资源管理，选项D属于过程管理。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-281",
    "number": 281,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "软件版本控制工具的核心功能是？",
    "options": [
      "自动化编译构建",
      "需求优先级排序",
      "追踪代码变更历史",
      "硬件资源监控"
    ],
    "answer": "C",
    "analysis": "版本控制工具主要用于记录代码变更历史（选项C），选项A属于持续集成工具，选项B属于需求管理，选项D属于硬件监控领域。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-282",
    "number": 282,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "硬件资源采购时应当优先考虑？",
    "options": [
      "设备品牌知名度",
      "供应商返利政策",
      "项目关键路径需求",
      "设备外观设计"
    ],
    "answer": "C",
    "analysis": "硬件采购需首先满足项目关键路径需求（选项C），其他选项属于次要考虑因素。这与硬件资源管理的核心原则一致。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-283",
    "number": 283,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "团队成员的技能矩阵主要用于：",
    "options": [
      "计算硬件资源利用率",
      "追踪软件许可证到期时间",
      "评估人员能力与任务匹配度",
      "监控服务器负载状态"
    ],
    "answer": "C",
    "analysis": "技能矩阵是人力资源管理中的重要工具，用于评估人员能力与任务的匹配度（选项C）。其他选项分别属于硬件和软件资源管理范畴。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-284",
    "number": 284,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪项属于软件资源的技术债务？",
    "options": [
      "未及时更新的文档",
      "老化的服务器设备",
      "团队沟通效率低下",
      "未购买的硬件保险"
    ],
    "answer": "A",
    "analysis": "技术债务属于软件资源管理范畴，未更新的文档（选项A）会累积技术债务。选项B/D属于硬件管理，选项C属于人力资源管理。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-285",
    "number": 285,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "在CMMI模型中，人力资源管理的关键实践领域不包括以下哪个方面？",
    "options": [
      "团队成员技能评估与能力培养",
      "项目利益相关者需求分析",
      "团队角色与职责定义",
      "绩效目标与激励机制设计"
    ],
    "answer": "B",
    "analysis": "人力资源管理主要关注团队能力建设，而利益相关者需求分析属于需求管理范畴。B选项属于需求管理领域而非人力资源管理。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-286",
    "number": 286,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "当项目需要同时进行代码质量检测和持续集成时，最合理的软件资源管理策略是：",
    "options": [
      "采购独立的质量检测工具和CI工具",
      "选择支持插件扩展的集成化平台",
      "要求开发人员手动执行质量检查",
      "延迟质量检测到测试阶段"
    ],
    "answer": "B",
    "analysis": "集成化平台通过插件机制可有效统一管理软件工具资源，降低维护成本并提升协作效率。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-287",
    "number": 287,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "某项目需要搭建持续集成环境，以下硬件资源配置要素中优先级最低的是：",
    "options": [
      "服务器SSD存储容量",
      "网络交换机端口数量",
      "CPU多核处理能力",
      "内存扩展槽位"
    ],
    "answer": "B",
    "analysis": "CI环境对计算性能和存储IO要求较高，普通网络交换机的端口数量在中小型项目中通常不会成为瓶颈。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-288",
    "number": 288,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "根据Tuckman团队发展阶段模型，正确的阶段顺序是：",
    "options": [
      "规范期→震荡期→成熟期→解散期",
      "形成期→成熟期→规范期→震荡期",
      "震荡期→形成期→规范期→成熟期",
      "形成期→震荡期→规范期→成熟期"
    ],
    "answer": "D",
    "analysis": "Tuckman模型经典五阶段为：Forming(形成)-Storming(震荡)-Norming(规范)-Performing(成熟)-Adjourning(解散)。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-289",
    "number": 289,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "当项目组成员同时参与多个项目时，最有效的软件资源协调方法是：",
    "options": [
      "采用集中式版本控制系统",
      "建立资源日历和预约制度",
      "强制规定最高优先级项目",
      "限制开发环境访问权限"
    ],
    "answer": "B",
    "analysis": "资源日历制度可以帮助可视化资源冲突，进行合理的资源分配与调度。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-290",
    "number": 290,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "进行服务器集群扩容决策时，最重要的硬件监控指标是：",
    "options": [
      "CPU平均利用率持续超过80%",
      "内存使用率偶尔达到90%",
      "磁盘温度异常告警",
      "网络丢包率0.1%"
    ],
    "answer": "A",
    "analysis": "CPU持续高利用率是计算资源不足的典型指标，需要优先考虑扩容。偶尔的内存峰值可通过优化解决。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-291",
    "number": 291,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "在敏捷项目中，团队成员的跨职能培养主要目的是：",
    "options": [
      "降低人员流动风险",
      "减少沟通会议时间",
      "简化绩效考核指标",
      "统一开发工具标准"
    ],
    "answer": "A",
    "analysis": "跨职能培养通过提高团队成员的能力冗余度，有效降低因人员流动导致的项目风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-292",
    "number": 292,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "选择持续集成服务器时，决定是否采用容器化部署的关键软件资源因素是：",
    "options": [
      "操作系统兼容性要求",
      "团队技术栈熟悉度",
      "项目预算限制",
      "代码仓库访问权限"
    ],
    "answer": "A",
    "analysis": "当需要同时支持多种操作系统环境时，容器化技术能更好地隔离依赖环境，保证构建一致性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-293",
    "number": 293,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "在硬件采购决策中，总拥有成本(TCO)分析不包含：",
    "options": [
      "设备报废残值",
      "供应商关系维护成本",
      "三年电力消耗",
      "运维人员培训费用"
    ],
    "answer": "B",
    "analysis": "TCO包含购置、运维、处置成本，供应商关系维护属于采购管理范畴，不计入TCO。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-294",
    "number": 294,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "某项目需要同时管理Python和Java组件，最合适的软件依赖管理方案是：",
    "options": [
      "为两种语言分别使用pip和Maven",
      "采用统一依赖管理工具如Conan",
      "要求开发人员手动维护依赖",
      "限制项目只使用一种语言"
    ],
    "answer": "B",
    "analysis": "统一依赖管理工具可以跨语言管理组件依赖，减少环境配置复杂度，提升可维护性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-295",
    "number": 295,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "在CMMI的‘人力资源管理’实践中，项目团队绩效评估应重点关注以下哪项？",
    "options": [
      "员工个人技能提升与团队目标达成度的平衡",
      "员工加班时长与项目进度的一致性",
      "团队成员的学历与项目复杂度的匹配",
      "员工年龄分布对项目风险的影响"
    ],
    "answer": "A",
    "analysis": "CMMI强调绩效评估应平衡员工能力发展和团队目标实现，而非单纯关注进度或学历等表面因素。选项A符合这一理念。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-296",
    "number": 296,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "软件资源管理中，开源工具的许可证冲突问题最可能影响项目的哪个阶段？",
    "options": [
      "需求分析阶段",
      "系统部署阶段",
      "代码编写阶段",
      "测试用例设计阶段"
    ],
    "answer": "B",
    "analysis": "许可证冲突通常在产品发布或部署时因法律合规审查暴露，例如GPL协议可能要求开源衍生代码。选项B正确。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-297",
    "number": 297,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "硬件资源规划的‘容量预测’方法中，下列哪种属于动态评估策略？",
    "options": [
      "基于历史峰值数据预留固定资源",
      "通过负载均衡自动扩展云服务器实例",
      "按项目成员数量平均分配工作站",
      "根据设备采购周期提前半年下单"
    ],
    "answer": "B",
    "analysis": "动态评估强调实时资源调整，如云环境的自动扩缩容。选项B是典型动态策略，其他选项均为静态规划。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-298",
    "number": 298,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "在敏捷项目中，下列哪项人力资源管理实践能有效降低‘成员角色模糊’风险？",
    "options": [
      "每日站立会议同步进展",
      "使用RACI矩阵明确责任划分",
      "实施代码评审制度",
      "定期组织团队聚餐"
    ],
    "answer": "B",
    "analysis": "RACI矩阵（Responsible/Accountable/Consulted/Informed）专门用于明确角色职责，直接解决角色模糊问题。选项B正确。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-299",
    "number": 299,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "软件版本控制中，‘特性开关(Feature Toggles)’技术主要用于解决：",
    "options": [
      "多团队并行开发的代码合并冲突",
      "未完成功能的分支隔离发布",
      "历史版本追溯困难",
      "自动化构建效率低下"
    ],
    "answer": "B",
    "analysis": "特性开关允许将未完成功能隐藏在生产环境，实现主干开发持续集成。选项B准确描述其核心价值。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-300",
    "number": 300,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "某项目需要部署高可用数据库集群，下列硬件配置方案中最具扩展性的是：",
    "options": [
      "采购3台物理服务器搭建主从复制",
      "采用容器化数据库实例+自动故障转移",
      "租用2台云虚拟机部署双活节点",
      "使用单服务器配合RAID10磁盘阵列"
    ],
    "answer": "B",
    "analysis": "容器化方案支持快速横向扩展，配合云原生调度策略，比传统物理机或普通云虚拟机更具弹性。选项B最优。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-301",
    "number": 301,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "根据CMMI‘团队能力发展’实践，提升跨职能团队协作效率最有效的方法是：",
    "options": [
      "增加团队建设活动频率",
      "实施T型技能培训计划",
      "统一所有成员的职称等级",
      "采用强制每日汇报制度"
    ],
    "answer": "B",
    "analysis": "T型技能（广博知识+领域专精）培训能增强成员间的任务互助能力，显著提升协作效率。选项B符合CMMI要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-302",
    "number": 302,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "边缘计算场景下的硬件资源管理特别需要关注：",
    "options": [
      "设备物理安全与远程监控",
      "CPU型号的全球统一",
      "显示器的色彩校准",
      "键盘鼠标的无线连接"
    ],
    "answer": "A",
    "analysis": "边缘设备通常分布在无人值守环境，物理安全和远程运维能力至关重要。选项A抓住了管理重点。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-303",
    "number": 303,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "项目团队成员频繁流动时，最应加强哪项人力资源管理活动？",
    "options": [
      "薪酬福利调研",
      "知识传递机制建设",
      "考勤制度严格化",
      "招聘渠道扩展"
    ],
    "answer": "B",
    "analysis": "人员流动时，知识转移的规范性直接影响项目延续性。建立文档化、结对编程等机制是CMMI推荐实践。选项B正确。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-304",
    "number": 304,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "在敏捷团队组建过程中，项目经理发现某成员同时承担开发与测试职责导致效率下降。根据CMMI的人力资源管理实践，最应该优先采取的措施是？",
    "options": [
      "立即招聘新测试人员分担工作",
      "使用自动化测试工具提升效率",
      "重新定义角色与职责矩阵",
      "开展跨职能技能培训"
    ],
    "answer": "C",
    "analysis": "根据CMMI的RSKM（风险管理）和WMC（工作监控）实践，清晰的职责划分优先于单纯增加人力或工具。角色职责矩阵能系统解决资源冲突问题，属于人力资源管理中的角色分配核心实践。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-305",
    "number": 305,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "某项目需要选择版本控制系统，除基础代码管理外还需实现需求追溯。根据软件资源管理原则，以下哪项技术组合最合适？",
    "options": [
      "Git + Jira + Confluence",
      "SVN + Jenkins + Selenium",
      "Mercurial + Docker + Prometheus",
      "Perforce + Postman + LoadRunner"
    ],
    "answer": "A",
    "analysis": "Git负责代码版本控制，Jira实现需求跟踪，Confluence管理文档，三者组合满足代码管理与需求追溯要求，属于软件资源管理中工具链集成的典型实践。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-306",
    "number": 306,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "当部署集群服务器时，项目经理发现现有网络交换机端口不足。根据硬件资源管理规范，应首先审查哪个过程文档？",
    "options": [
      "基础设施容量规划报告",
      "采购审批流程单",
      "网络拓扑架构图",
      "设备维护日志表"
    ],
    "answer": "A",
    "analysis": "容量规划文档包含硬件资源配置的预期需求与实际差距分析，属于硬件资源管理的核心输入产物，能够直接反映基础设施扩展需求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-307",
    "number": 307,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "在敏捷团队中，某成员同时承担开发与测试职责导致效率下降。根据CMMI的人力资源管理原则，项目经理应采取何种措施？",
    "options": [
      "采用技能矩阵分析并重新分配专职角色",
      "增加该成员绩效考核权重",
      "要求团队成员自愿报名兼职",
      "外包测试工作以减轻负担"
    ],
    "answer": "A",
    "analysis": "CMMI强调通过角色能力匹配提升组织效能，技能矩阵（Skill Matrix）可系统评估成员能力与任务要求的匹配度，专职角色分配能有效解决职责混杂问题。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-308",
    "number": 308,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "某企业计划开发AI驱动的需求分析工具，下列哪种软件许可模式最能满足长期演进需求？",
    "options": [
      "购买商用闭源SDK授权",
      "采用GPLv3开源框架二次开发",
      "租赁SaaS平台API接口",
      "使用BSD协议开源组件定制"
    ],
    "answer": "B",
    "analysis": "GPLv3许可允许修改和再分发，强制开源特性保障持续演进，符合自主可控要求。BSD协议虽更宽松但不利于技术保护，商用授权和SaaS模式存在长期依赖风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-309",
    "number": 309,
    "module": "人力与资源管理",
    "type": "SINGLE_CHOICE",
    "stem": "部署深度学习训练集群时，下列哪种硬件架构最能平衡吞吐量与故障容忍？",
    "options": [
      "单一NVIDIA DGX节点",
      "采用Ceph存储的Kubernetes集群",
      "多机TCP/IP直连架构",
      "AWS Snowball边缘设备"
    ],
    "answer": "B",
    "analysis": "Kubernetes提供弹性伸缩能力，Ceph分布式存储保障数据可靠性，这种组合完美平衡计算吞吐与系统容错，符合CMMI硬件资源管理的可靠性要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-310",
    "number": 310,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "人力资源管理的关键在于优化团队成员的技能分配，而非单纯增加成员数量。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "人力资源管理的核心是通过合理分配团队成员的技能和角色，提高整体效率，而非盲目增加人力。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-311",
    "number": 311,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "软件资源管理仅关注开发工具的采购与安装，不涉及后续维护。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "软件资源管理涵盖全生命周期管理，包括工具的采购、安装、维护及优化使用。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-312",
    "number": 312,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "硬件资源管理不需要考虑设备的兼容性问题。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "硬件资源管理需确保设备兼容性，避免因硬件冲突导致项目延迟或成本增加。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-313",
    "number": 313,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "在CMMI模型中，人力资源管理属于过程管理领域的子实践。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "人力资源管理属于CMMI的资源管理领域，而非过程管理领域。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-314",
    "number": 314,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "软件复用可以有效减少开发时间，属于软件资源管理的重要内容。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "软件复用通过重复使用已有组件降低开发成本和时间，是软件资源管理的核心策略之一。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-315",
    "number": 315,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "硬件资源的性能监控不属于硬件资源管理的范畴。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "硬件资源管理需监控性能，确保资源有效利用并预防潜在问题。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-316",
    "number": 316,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "在敏捷开发中，人力资源管理的重点是通过固定角色分配提升效率。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "敏捷开发强调灵活的角色分配和跨职能协作，而非固定角色。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-317",
    "number": 317,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "软件许可证的合规性管理是软件资源管理的重要组成部分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "确保软件许可证的合法使用可避免法律风险，是软件资源管理的关键内容。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-318",
    "number": 318,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "硬件资源调度算法只关注效率，无需考虑能耗问题。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "现代硬件资源管理需兼顾效率与能耗优化，以符合绿色计算要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-319",
    "number": 319,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "团队成员的绩效考核应完全基于个人成果，与团队协作无关。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "绩效考核需综合考虑个人贡献与团队协作能力，以促进整体项目目标实现。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-320",
    "number": 320,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "版本控制系统（如Git）的管理属于软件资源管理的职责范围。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "版本控制工具的选择与维护是软件资源管理中代码资产管理的重要环节。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-321",
    "number": 321,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "硬件资源采购时只需考虑当前需求，无需预留扩展能力。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "硬件资源规划需考虑未来扩展性，避免因需求增长导致重复投资。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-322",
    "number": 322,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "CMMI的“资源管理”领域仅包含人力资源管理，不涉及其他资源。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "CMMI的资源管理领域涵盖人力、软件、硬件等所有项目所需资源的协调与管理。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-323",
    "number": 323,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "培训计划制定属于人力资源管理中的团队发展策略。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "通过培训提升成员技能，是人力资源管理促进团队发展的有效手段。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-324",
    "number": 324,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "开源软件可直接使用，无需进行安全审计和合规性审查。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "开源软件使用需经过安全审计和合规性审查，以避免引入漏洞或法律风险。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-325",
    "number": 325,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "服务器虚拟化技术属于硬件资源管理中的优化手段。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "通过虚拟化提高硬件利用率，是硬件资源管理的重要优化方法。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-326",
    "number": 326,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "冲突管理在人力资源管理中不重要，因为冲突会自然消失。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "冲突管理是人力资源管理的核心任务之一，需通过主动干预维持团队稳定。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-327",
    "number": 327,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "软件工具的版本升级决策只需开发团队参与，无需资源管理人员介入。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "版本升级涉及成本、兼容性等多方面因素，需资源管理人员协调决策。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-328",
    "number": 328,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "硬件资源的折旧成本核算不属于硬件资源管理的职责范围。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "硬件资源管理需核算全生命周期成本，包括采购、运维和折旧费用。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-329",
    "number": 329,
    "module": "人力与资源管理",
    "type": "TRUE_FALSE",
    "stem": "在矩阵型组织中，人力资源管理需平衡职能经理与项目经理的权责分配。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "矩阵型组织中，双线汇报关系需要清晰定义权责以避免管理冲突。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-330",
    "number": 330,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "质量控制是（ ）",
    "options": [
      "对每个工作包增加工作时间",
      "项目生存期的各个阶段都需要实施的",
      "只需要做一次",
      "只有大的项目才需要的"
    ],
    "answer": "B",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-331",
    "number": 331,
    "module": "质量管理与 CMMI",
    "type": "SUBJECTIVE",
    "stem": "CMM",
    "options": [],
    "answer": "能力成熟度模型",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-332",
    "number": 332,
    "module": "质量管理与 CMMI",
    "type": "SUBJECTIVE",
    "stem": "CMMI",
    "options": [],
    "answer": "能力成熟度集成模型",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-333",
    "number": 333,
    "module": "质量管理与 CMMI",
    "type": "SUBJECTIVE",
    "stem": "国家标准《GB/T16260-1996软件产品评价质量特性及其使用指南》规定了软件质量可用哪6个特性来评价？",
    "options": [],
    "answer": "功能性、可靠性、易用性、效率、可维护性、可移植性",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-334",
    "number": 334,
    "module": "质量管理与 CMMI",
    "type": "SUBJECTIVE",
    "stem": "请简述软件评审的概念。",
    "options": [],
    "answer": "软件评审又称技术评审或同行评审，它是指由开发人员的技术同行在项目实施的各个阶段进行的有组织的软件浏览、文档与代码审读活动，验证工作是否符合预定的标准，其目的是协助软件开发人员在项目早期找出工作的错误。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-335",
    "number": 335,
    "module": "质量管理与 CMMI",
    "type": "SUBJECTIVE",
    "stem": "简述软件测试的类型",
    "options": [],
    "answer": "单元测试、集成测试、功能测试、回归测试、验收及安装测试、Beta测试、配置测试、兼容性测试、语言测试、易用性测试。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-336",
    "number": 336,
    "module": "质量管理与 CMMI",
    "type": "SUBJECTIVE",
    "stem": "CMM软件能力成熟度模型的5个分级。",
    "options": [],
    "answer": "初始级、可重复级、已定义级、已管理级、优化级。",
    "analysis": "",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-337",
    "number": 337,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在软件质量管理中，'预防缺陷比发现并修复缺陷更经济'这一观点最直接体现了以下哪个质量管理原则？",
    "options": [
      "过程方法",
      "持续改进",
      "基于事实的决策方法",
      "领导作用"
    ],
    "answer": "A",
    "analysis": "过程方法强调将活动和相关资源作为过程进行管理，通过优化过程预防缺陷的产生，符合题目描述的预防优先原则。选项B持续改进侧重质量水平提升，选项C强调数据驱动，选项D属于质量管理体系组织层面的要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-338",
    "number": 338,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪种软件评审方法需要提前通过正式检查清单来引导审查过程？",
    "options": [
      "走查",
      "技术评审",
      "临时评审",
      "结构化审查（Fagan检查法）"
    ],
    "answer": "D",
    "analysis": "结构化审查（Fagan检查法）是高度规范的评审方法，要求使用预定义的检查清单和角色分工。选项A走查侧重场景演示，选项B技术评审强调技术正确性验证，选项C属于非正式评审形式。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-339",
    "number": 339,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在CMMI成熟度模型中，'定量过程管理'过程域属于哪个能力等级的特征？",
    "options": [
      "已定义级（3级）",
      "量化管理级（4级）",
      "优化级（5级）",
      "已管理级（2级）"
    ],
    "answer": "B",
    "analysis": "量化管理级（4级）的特征是使用统计技术进行过程管控。选项A已定义级强调标准化过程，选项C优化级注重持续改进，选项D已管理级侧重项目层面的计划管理。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-340",
    "number": 340,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在软件质量管理中，下列哪项属于预防成本？",
    "options": [
      "质量培训费用",
      "返工修复缺陷成本",
      "客户投诉处理成本",
      "产品召回成本"
    ],
    "answer": "A",
    "analysis": "预防成本包括质量规划、培训、过程改进等主动预防缺陷的投入，A选项符合定义。其他选项属于内部失效成本（B）或外部失效成本（C、D）。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-341",
    "number": 341,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "软件测试中，单元测试的主要目标是验证：",
    "options": [
      "模块间的接口正确性",
      "整个系统的功能完整性",
      "单个函数或类的逻辑正确性",
      "用户界面交互体验"
    ],
    "answer": "C",
    "analysis": "单元测试针对程序的最小可测试单元（如函数、类）验证其内部逻辑正确性。A是集成测试目标，B是系统测试目标，D属于验收测试范畴。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-342",
    "number": 342,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "以下哪项是ISO 9000:2000质量管理体系的核心原则？",
    "options": [
      "过程方法",
      "全面文档化管理",
      "严格的代码审查制度",
      "自动化测试覆盖率"
    ],
    "answer": "A",
    "analysis": "ISO 9000:2000八大原则中，过程方法是核心原则之一，强调将活动和资源作为过程进行管理。B、C、D属于具体执行方法，不属于体系原则。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-343",
    "number": 343,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在缺陷跟踪系统中，'优先级'字段通常表示：",
    "options": [
      "缺陷修复的技术难度",
      "缺陷对用户影响程度的紧急度",
      "缺陷所属模块的重要程度",
      "开发人员修复缺陷的顺序"
    ],
    "answer": "B",
    "analysis": "优先级反映缺陷修复的紧迫性（商业影响），而严重程度描述缺陷的技术影响。D可能受优先级影响，但不是字段本身的定义。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-344",
    "number": 344,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "CMMI中'需求管理'过程域归属于哪个过程域类别？",
    "options": [
      "过程管理",
      "项目管理",
      "工程",
      "支持"
    ],
    "answer": "C",
    "analysis": "需求管理属于工程类过程域，聚焦于需求分析和管理。项目管理类包括项目计划、监控等，支持类包括配置管理、质量保证。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-345",
    "number": 345,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在软件评审过程中，'准备评审材料'属于评审的哪个阶段？",
    "options": [
      "计划阶段",
      "预备阶段",
      "正式评审会议",
      "缺陷跟踪"
    ],
    "answer": "B",
    "analysis": "预备阶段包括分发材料、参与者预先审查文档等准备工作。计划阶段涉及确定评审目标和参与者，正式会议是评审执行。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-346",
    "number": 346,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "下列哪种测试技术最适合发现边界值错误？",
    "options": [
      "等价类划分",
      "边界值分析",
      "决策表测试",
      "状态转换测试"
    ],
    "answer": "B",
    "analysis": "边界值分析专门针对输入域的边界值进行测试，能有效发现如循环终止条件错误等问题。等价类划分侧重于典型值。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-347",
    "number": 347,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "ISO 9001认证主要验证组织：",
    "options": [
      "产品质量达到行业最高标准",
      "具备持续提供符合要求产品的能力",
      "采用最新软件开发技术",
      "所有项目零缺陷交付"
    ],
    "answer": "B",
    "analysis": "ISO 9001认证关注质量管理体系的有效性，确保组织有能力稳定提供合格产品，并非要求技术先进性或零缺陷。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-348",
    "number": 348,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "以下哪项是缺陷预防的关键实践？",
    "options": [
      "在测试阶段增加测试用例数量",
      "实施根本原因分析并改进过程",
      "延长开发周期以充分调试",
      "增加代码审查会议次数"
    ],
    "answer": "B",
    "analysis": "缺陷预防需要分析缺陷根源，改进开发过程以减少同类问题。A、D是缺陷检测手段，C可能降低效率但未解决根本问题。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-349",
    "number": 349,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在CMMI连续式表示法中，'过程域能力等级3'代表：",
    "options": [
      "已执行过程",
      "已定义过程",
      "已量化管理过程",
      "已优化过程"
    ],
    "answer": "B",
    "analysis": "连续式模型中能力等级3要求过程按组织标准定义并可裁剪使用。等级4引入量化管理，等级5侧重持续优化。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-350",
    "number": 350,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "以下哪种评审类型需要作者逐行讲解代码？",
    "options": [
      "审查（Inspection）",
      "走查（Walkthrough）",
      "技术评审",
      "同行评审"
    ],
    "answer": "B",
    "analysis": "走查通常由作者逐行解释工件，参与者提问讨论。审查更侧重由审查者事先准备并基于检查表发现问题。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-351",
    "number": 351,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "统计测试覆盖率时，'分支覆盖'对应下列哪项描述？",
    "options": [
      "每个可执行语句至少执行一次",
      "每个判定条件的所有可能结果至少执行一次",
      "所有函数至少被调用一次",
      "所有输入参数组合被覆盖"
    ],
    "answer": "B",
    "analysis": "分支覆盖要求每个判定条件的真假分支均被覆盖。A是语句覆盖，C/D属于更高层次的覆盖标准。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-352",
    "number": 352,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "根据质量管理中的PDCA循环，'实施改进措施'属于哪个阶段？",
    "options": [
      "Plan",
      "Do",
      "Check",
      "Act"
    ],
    "answer": "B",
    "analysis": "PDCA循环中Do阶段执行计划措施，Check是评估结果，Act是标准化改进。注意部分资料中Act阶段可能包含实施，此处根据标准定义选B。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-353",
    "number": 353,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "缺陷跟踪系统中，'已解决'状态的缺陷下一步应：",
    "options": [
      "直接关闭",
      "由测试人员验证修复",
      "提交给项目经理审核",
      "标记为不再出现"
    ],
    "answer": "B",
    "analysis": "开发人员标记缺陷为已解决后，需测试团队验证修复有效性，通过后方可关闭。跳过验证可能导致缺陷未被实际解决。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-354",
    "number": 354,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "CMMI模型中，'组织创新与部署'过程域属于：",
    "options": [
      "支持类过程域",
      "过程管理类",
      "项目管理类",
      "工程类"
    ],
    "answer": "B",
    "analysis": "组织创新与部署属于过程管理类，涉及改进组织级过程资产。支持类包括质量保证、决策分析等。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-355",
    "number": 355,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "以下哪项是自动化测试的局限性？",
    "options": [
      "提高回归测试效率",
      "无法替代探索性测试",
      "减少人为操作错误",
      "支持持续集成"
    ],
    "answer": "B",
    "analysis": "自动化测试擅长重复性任务，但无法替代需要人类直觉的探索性测试。其他选项均为自动化测试的优势。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-356",
    "number": 356,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "ISO 9000质量管理体系中，'基于事实的决策方法'要求组织：",
    "options": [
      "完全依赖专家经验决策",
      "收集并分析数据支持决策",
      "采用多数表决制决策",
      "遵循历史决策案例"
    ],
    "answer": "B",
    "analysis": "该原则强调决策应基于对数据和信息的分析，而非主观判断。A、C、D均未体现数据驱动的核心要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-357",
    "number": 357,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在敏捷开发的迭代周期中，以下哪种质量控制活动最能直接体现CMMI成熟度等级3的过程制度化要求？",
    "options": [
      "每日站会后立即执行冒烟测试",
      "产品负责人自主审查用户故事优先级",
      "迭代结束后的用户手册编写",
      "随机抽查开发人员的代码注释规范"
    ],
    "answer": "A",
    "analysis": "CMMI成熟度3级要求过程被制度化并建立组织级资产。冒烟测试作为持续集成的重要环节，通过每日站会后的自动化执行形成稳定的质量检查机制，符合制度化特征。其他选项均未体现标准化和可重复性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-358",
    "number": 358,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "某项目组使用鱼骨图分析发现60%的缺陷根源在于需求变更失控。根据ISO 9000:2000原则，最应优先实施哪项改进？",
    "options": [
      "在测试阶段增加回归测试轮次",
      "建立配置管理委员会评审变更影响",
      "为开发人员提供需求分析培训",
      "采购更先进的缺陷管理工具"
    ],
    "answer": "B",
    "analysis": "ISO 9000的'过程方法'原则强调控制过程输入。建立变更评审机制能从根本上解决需求变更失控问题，体现预防为主的质量管理思想。其他选项均属事后补救措施。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-359",
    "number": 359,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "技术评审中发现某接口设计未考虑并发场景。根据CMMI过程域划分，该缺陷的预防应属于哪个过程域的责任？",
    "options": [
      "需求开发",
      "技术解决方案",
      "过程与产品质量保证",
      "风险管理"
    ],
    "answer": "B",
    "analysis": "技术解决方案(TS)过程域涵盖系统设计活动，接口设计的并发场景缺失属于设计方案缺陷，应在TS过程域通过架构评审等方法预防。PPQA属于质量监督，不直接参与设计改进。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-360",
    "number": 360,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "使用正交阵列法设计测试用例时发现多个缺陷具有相同根本原因。这最可能违背了测试用例设计的哪个基本原则？",
    "options": [
      "可重复性",
      "有效性",
      "经济性",
      "可追溯性"
    ],
    "answer": "B",
    "analysis": "有效性原则要求测试用例能够独立揭示不同缺陷。正交阵列法的参数组合本应最大化缺陷发现效率，出现相同根源的多个缺陷说明用例设计的正交性被破坏，导致冗余测试。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-361",
    "number": 361,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "软件项目处于CMMI成熟度2级时，配置管理活动应重点关注：",
    "options": [
      "组织级组件复用库的建设",
      "跨项目的基线变更协调",
      "单个项目的版本控制",
      "自动化部署流水线的实施"
    ],
    "answer": "C",
    "analysis": "CMMI 2级是已管理级，要求建立项目级的配置管理过程，而组织级复用(3级)和跨项目协调(4级)属于更高成熟度级别的要求。自动化部署属于持续交付实践，非CMMI直接要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-362",
    "number": 362,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在CMMI模型的能力等级划分中，量化管理属于以下哪个级别的特征？",
    "options": [
      "级别3：已定义级",
      "级别4：量化管理级",
      "级别2：已管理级",
      "级别5：优化级"
    ],
    "answer": "B",
    "analysis": "CMMI级别4（量化管理级）的核心特征是通过统计技术对过程进行量化控制，建立可预测的质量目标。级别5关注过程持续优化，级别3关注标准过程制度化，级别2关注项目级管理。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-363",
    "number": 363,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在软件缺陷跟踪流程中，以下哪个状态流转顺序符合典型生命周期？",
    "options": [
      "新建→验证→分配→修复→关闭",
      "新建→分配→修复→验证→重新打开",
      "新建→修复→回归测试→关闭",
      "发现→分析→挂起→拒绝"
    ],
    "answer": "B",
    "analysis": "标准流程为：发现缺陷后新建→分配给开发人员→修复完成→测试人员验证修复结果→若验证失败可能重新打开。选项D遗漏了修复环节，选项A和C顺序错误。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-364",
    "number": 364,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "某项目组在代码审查时发现接口参数校验缺失，这属于ISO 9000:2000质量管理原则中的哪一项实践不足？",
    "options": [
      "以顾客为关注焦点",
      "领导作用",
      "过程方法",
      "基于事实的决策"
    ],
    "answer": "C",
    "analysis": "过程方法要求将活动作为相互关联的过程进行系统管理，参数校验属于开发过程中的关键控制点。该缺陷表明过程定义或执行存在漏洞，未能有效实施过程方法。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-365",
    "number": 365,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "以下哪种测试方法最适合验证系统在异常负载下的性能表现？",
    "options": [
      "边界值分析",
      "压力测试",
      "回归测试",
      "等价类划分"
    ],
    "answer": "B",
    "analysis": "压力测试专门用于评估系统在超出正常负载条件时的行为表现，边界值分析和等价类划分是黑盒测试用例设计方法，回归测试用于验证修改后的系统。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-366",
    "number": 366,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在CMMI的通用实践中，『GP 2.8 监控与控制』要求项目经理采取的行动是：",
    "options": [
      "制定组织级培训计划",
      "对照计划跟踪实际进展",
      "建立量化质量目标",
      "实施因果分析会议"
    ],
    "answer": "B",
    "analysis": "GP 2.8属于项目监督与控制实践域，核心是持续跟踪项目绩效并采取纠正措施。选项D属于因果分析（CMMI5实践），选项C属于量化项目管理（CMMI4）。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-367",
    "number": 367,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "进行软件需求评审时，发现某功能需求描述存在二义性。这最可能导致哪类质量成本增加？",
    "options": [
      "预防成本",
      "评估成本",
      "内部失败成本",
      "外部失败成本"
    ],
    "answer": "C",
    "analysis": "需求二义性属于早期缺陷，若未在评审阶段发现，将引发后续返工（如设计修改、代码重写），属于内部失败成本。若缺陷流出到客户环境则产生外部失败成本。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-368",
    "number": 368,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "某团队采用自动化工具记录缺陷的严重程度、优先级和重现步骤，这直接支持了软件测试的哪个特性？",
    "options": [
      "测试可重复性",
      "测试充分性",
      "测试覆盖率",
      "测试有效性"
    ],
    "answer": "A",
    "analysis": "详细记录缺陷重现步骤可确保其他人员按相同步骤复现问题，增强测试可重复性。覆盖率与充分性涉及测试用例设计质量，有效性关注缺陷发现能力。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-369",
    "number": 369,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "根据ISO 9001:2000标准，组织必须建立的文件体系中不包括：",
    "options": [
      "质量手册",
      "程序文件",
      "工作指南",
      "用户需求文档"
    ],
    "answer": "D",
    "analysis": "ISO 9001要求的三层文件体系为质量手册（A）、程序文件（B）、作业指导书/记录（C）。用户需求文档属于项目产出物而非质量管理体系文件。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-370",
    "number": 370,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "在敏捷开发中，持续集成实践对软件质量的主要贡献在于：",
    "options": [
      "降低代码耦合度",
      "缩短测试周期",
      "提前发现集成错误",
      "增强需求可追溯性"
    ],
    "answer": "C",
    "analysis": "持续集成通过频繁的代码合并和自动化构建/测试，能快速暴露接口错误和集成问题。选项B是结果而非主要质量贡献，选项A和D属于其他实践的影响。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-371",
    "number": 371,
    "module": "质量管理与 CMMI",
    "type": "SINGLE_CHOICE",
    "stem": "某组织通过分析历史缺陷数据发现，30%的缺陷源于需求变更未及时同步。最应采取哪种预防措施？",
    "options": [
      "加强配置管理",
      "增加测试轮次",
      "实施代码审查",
      "培训开发人员"
    ],
    "answer": "A",
    "analysis": "需求变更同步问题属于配置管理范畴，加强变更控制和版本跟踪可从源头预防此类缺陷。选项B/C/D属于缺陷检测或修复环节的措施。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-372",
    "number": 372,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "质量管理中的质量保证（QA）主要职责是检测和修复产品缺陷。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "质量保证（QA）的核心是预防缺陷，通过过程改进来确保质量；检测和修复缺陷属于质量控制（QC）的范畴。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-373",
    "number": 373,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "软件评审可以在需求分析阶段进行，而不仅限于编码完成后。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "软件评审适用于整个开发周期，包括需求文档、设计文档等的审查，早期发现问题可显著降低修复成本。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-374",
    "number": 374,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "单元测试通常由专门的测试团队而非开发人员执行。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "单元测试一般由开发人员自行完成，因其需结合代码逻辑进行快速验证，而测试团队更关注集成和系统测试。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-375",
    "number": 375,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "缺陷跟踪系统的记录应包括缺陷的优先级、状态和历史处理记录。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "完整的缺陷跟踪需记录优先级、状态、修复过程等信息，以便全生命周期管理和追溯。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-376",
    "number": 376,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "ISO 9000:2000标准的核心是通过客户满意度驱动持续改进。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "ISO 9000:2000强调以客户为中心和持续改进，其八大原则中明确包含这两项核心要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-377",
    "number": 377,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "CMMI成熟度等级5（优化级）要求组织具备量化过程管理能力。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "等级5的核心是持续优化过程，而量化过程管理是等级4（量化管理级）的关键特征。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-378",
    "number": 378,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "测试覆盖率达到100%可以确保软件没有缺陷。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "高覆盖率只能降低缺陷概率，但无法彻底消除，例如逻辑错误或未覆盖的异常场景仍可能存在。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-379",
    "number": 379,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "因果分析图（鱼骨图）主要用于软件评审过程中识别潜在风险。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "因果分析图是缺陷预防的常用工具，用于追溯问题根源，而非直接用于评审风险识别。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-380",
    "number": 380,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "ISO 9000:2000认证要求企业必须使用特定的开发方法论。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "ISO 9000认证关注过程管理框架，而非具体技术方法，企业可自主选择开发方式。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-381",
    "number": 381,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "CMMI成熟度等级2（已管理级）要求所有项目均制定标准化流程。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "等级2仅要求项目级过程可控，而组织级标准化流程是等级3（已定义级）的要求。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-382",
    "number": 382,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "软件评审的主要目的是评估开发人员的个人能力。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "评审的核心目标是发现缺陷和改进工作产品，而非针对个人能力的考核。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-383",
    "number": 383,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "回归测试主要用于验证新功能是否按预期工作。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "回归测试的重点是确保修改未引入副作用，而非验证新功能（后者属于功能测试范畴）。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-384",
    "number": 384,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "缺陷的严重程度（Severity）与其优先级（Priority）必然一致。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "严重程度描述影响大小，优先级决定修复顺序，两者可能不同（如低严重性但高商业优先级的缺陷）。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-385",
    "number": 385,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "质量管理中的PDCA循环包含计划、执行、检查、改进四个阶段。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "PDCA（Plan-Do-Check-Act）是质量管理的基础方法，贯穿ISO 9000和CMMI等体系。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-386",
    "number": 386,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "CMMI模型中，组织级培训（OT）属于过程管理类别的过程域。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "组织级培训（Organizational Training）属于CMMI的支持类过程域，旨在提升组织整体能力。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-387",
    "number": 387,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "软件测试的V模型强调测试活动与开发阶段的对应关系。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "V模型中，每个开发阶段（如需求分析）均有对应的测试级别（如验收测试），体现并行性。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-388",
    "number": 388,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "同行评审（Peer Review）必须有外部专家参与以确保客观性。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "错误",
    "analysis": "同行评审可由项目组成员完成，其核心是同行交叉检查而非依赖外部专家。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-389",
    "number": 389,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "ISO 9000:2000的质量管理原则包含基于事实的决策方法。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "八大原则中的第七条明确要求决策应基于数据和信息分析。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-390",
    "number": 390,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "CMMI的连续式模型允许组织针对特定过程域进行改进。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "连续式模型关注过程域能力等级，支持选择性优化，而阶段式模型要求按成熟度等级整体提升。",
    "scored": true,
    "images": []
  },
  {
    "id": "pm-391",
    "number": 391,
    "module": "质量管理与 CMMI",
    "type": "TRUE_FALSE",
    "stem": "缺陷预防的核心是对已发现缺陷的根因分析。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": "正确",
    "analysis": "通过分析历史缺陷的根本原因，可改进开发过程以避免同类问题重现，这是预防的核心手段。",
    "scored": true,
    "images": []
  }
];

export const PROJECT_MANAGEMENT_TOTAL_COUNT = PROJECT_MANAGEMENT_QUESTIONS.length;
export const PROJECT_MANAGEMENT_SCORED_COUNT = PROJECT_MANAGEMENT_QUESTIONS.filter((question) => question.scored).length;

export const PROJECT_MANAGEMENT_CHAPTERS = PROJECT_MANAGEMENT_MODULES.map((title, index) => {
  const chapter = index + 1;
  const questions = PROJECT_MANAGEMENT_QUESTIONS.filter((question) => question.module === title);
  return {
    chapter,
    title,
    startQuestionNumber: questions[0].number,
    endQuestionNumber: questions[questions.length - 1].number,
    totalCount: questions.length,
    scoredCount: questions.filter((question) => question.scored).length,
    objectiveCount: questions.filter(
      (question) => question.type !== PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE,
    ).length,
    subjectiveCount: questions.filter(
      (question) => question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE,
    ).length,
    subjectiveScoredCount: questions.filter(
      (question) =>
        question.type === PROJECT_MANAGEMENT_QUESTION_TYPES.SUBJECTIVE && question.scored,
    ).length,
    imageCount: questions.reduce((sum, question) => sum + question.images.length, 0),
  };
});
