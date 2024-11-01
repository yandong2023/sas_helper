const sasFunctions = [
    {
        name: "ABS",
        description: "返回数字的绝对值",
        syntax: "ABS(numeric)",
        example: "abs_value = ABS(-5.2); /* 返回 5.2 */",
        category: "数学函数"
    },
    {
        name: "MEAN",
        description: "计算参数的算术平均值",
        syntax: "MEAN(value1, value2, ..., valuen)",
        example: "avg = MEAN(10,20,30); /* 返回 20 */",
        category: "统计函数"
    },
    {
        name: "DATE",
        description: "返回当前日期的SAS日期值",
        syntax: "DATE()",
        example: "today = DATE();",
        category: "日期函数"
    },
    {
        name: "SUBSTR",
        description: "提取字符串的一部分",
        syntax: "SUBSTR(string, position <,length>)",
        example: "sub = SUBSTR('ABCDEF', 2, 3); /* 返回 'BCD' */",
        category: "字符串函数"
    },
    // 随机数和概率分布函数
    {
        name: "RANBIN",
        description: "生成服从二项分布的随机数",
        syntax: "RANBIN(seed, n, p)",
        example: "x = RANBIN(0, 100, 0.5); /* 生成n=100,p=0.5的二项分布随机数 */",
        category: "随机数函数"
    },
    {
        name: "RANNOR",
        description: "生成服从标准正态分布的随机数",
        syntax: "RANNOR(seed)",
        example: "x = RANNOR(0); /* 生成标准正态分布随机数 */",
        category: "随机数函数"
    },
    {
        name: "RANUNI",
        description: "生成服从均匀分布的随机数",
        syntax: "RANUNI(seed)",
        example: "x = RANUNI(0); /* 生成[0,1]均匀分布随机数 */",
        category: "随机数函数"
    },
    {
        name: "RANGAM",
        description: "生成服从伽马分布的随机数",
        syntax: "RANGAM(seed, a)",
        example: "x = RANGAM(0, 2); /* 生成形状参数为2的伽马分布随机数 */",
        category: "随机数函数"
    },
    {
        name: "RANPOI",
        description: "生成服从泊松分布的随机数",
        syntax: "RANPOI(seed, mean)",
        example: "x = RANPOI(0, 5); /* 生成均值为5的泊松分布随机数 */",
        category: "随机数函数"
    },
    // 概率分布函数
    {
        name: "PDF",
        description: "计算概率密度函数值",
        syntax: "PDF(distribution, x, parameter1, ..., parameterN)",
        example: "p = PDF('NORMAL', 0, 0, 1); /* 标准正态分布在x=0处的密度 */",
        category: "概率函数"
    },
    {
        name: "CDF",
        description: "计算累积分布函数值",
        syntax: "CDF(distribution, x, parameter1, ..., parameterN)",
        example: "p = CDF('NORMAL', 1.96, 0, 1); /* 标准正态分布的0.975分位数 */",
        category: "概率函数"
    },
    {
        name: "QUANTILE",
        description: "计算分位数",
        syntax: "QUANTILE(distribution, p, parameter1, ..., parameterN)",
        example: "x = QUANTILE('NORMAL', 0.975, 0, 1); /* 标准正态分布的0.975分位数 */",
        category: "概率函数"
    },
    // 高级数学函数
    {
        name: "BETA",
        description: "计算Beta函数值",
        syntax: "BETA(a, b)",
        example: "b = BETA(2, 3);",
        category: "数学函数"
    },
    {
        name: "GAMMA",
        description: "计算Gamma函数值",
        syntax: "GAMMA(x)",
        example: "g = GAMMA(5);",
        category: "数学函数"
    },
    {
        name: "FACT",
        description: "计算阶乘",
        syntax: "FACT(n)",
        example: "f = FACT(5); /* 返回 120 */",
        category: "数学函数"
    },
    // ��据处理函数
    {
        name: "LAG",
        description: "返回变量的滞后值",
        syntax: "LAG(variable)",
        example: "prev = LAG(x);",
        category: "数据处理函数"
    },
    {
        name: "DIF",
        description: "计算相邻观测值的差分",
        syntax: "DIF(variable)",
        example: "diff = DIF(x);",
        category: "数据处理函数"
    },
    {
        name: "FIRST.",
        description: "标识分组中的第一个观测",
        syntax: "FIRST.variable",
        example: "if FIRST.group then do;",
        category: "数据处理函数"
    },
    {
        name: "LAST.",
        description: "标识分组中的最后一个观测",
        syntax: "LAST.variable",
        example: "if LAST.group then do;",
        category: "数据处理函数"
    },
    // 字符处理高级函数
    {
        name: "COMPRESS",
        description: "删除字符串中的指定字符",
        syntax: "COMPRESS(string, characters)",
        example: "result = COMPRESS('A1B2C3', '123'); /* 返回 'ABC' */",
        category: "字符串函数"
    },
    {
        name: "TRANWRD",
        description: "替换字符串中的词",
        syntax: "TRANWRD(string, target, replacement)",
        example: "new = TRANWRD('Hello World', 'World', 'SAS'); /* 返回 'Hello SAS' */",
        category: "字符串函数"
    },
    {
        name: "SCAN",
        description: "提取字符串中的第n个词",
        syntax: "SCAN(string, n, delimiters)",
        example: "word = SCAN('Hello World SAS', 2); /* 返回 'World' */",
        category: "字符串函数"
    },
    // SAS 过程语句
    {
        name: "PROC MEANS",
        description: "计算数值变量的描述性统计量",
        syntax: "PROC MEANS <options> <statistic-keyword(s)>;\n  VAR variables;\n  CLASS variables;\nRUN;",
        example: "proc means data=sashelp.class mean std min max;\n  var age height weight;\n  class sex;\nrun;",
        category: "过程语句"
    },
    {
        name: "PROC FREQ",
        description: "生成频率表和列联表",
        syntax: "PROC FREQ <options>;\n  TABLES variables;\n  WEIGHT variable;\nRUN;",
        example: "proc freq data=sashelp.class;\n  tables sex*age / chisq;\nrun;",
        category: "过程语句"
    },
    {
        name: "PROC SQL",
        description: "使用SQL语句处理数据",
        syntax: "PROC SQL;\n  SELECT columns\n  FROM table\n  WHERE condition;\nQUIT;",
        example: "proc sql;\n  select mean(age) as avg_age\n  from sashelp.class\n  where sex='F';\nquit;",
        category: "过程语句"
    },
    {
        name: "PROC SORT",
        description: "对数据集进行排序",
        syntax: "PROC SORT DATA=dataset <OUT=output-dataset>;\n  BY variables;\nRUN;",
        example: "proc sort data=sashelp.class out=class_sorted;\n  by age sex;\nrun;",
        category: "过程语句"
    },
    {
        name: "PROC PRINT",
        description: "打印数据集内容",
        syntax: "PROC PRINT DATA=dataset <options>;\n  VAR variables;\nRUN;",
        example: "proc print data=sashelp.class;\n  var name age height weight;\nrun;",
        category: "过程语句"
    },
    {
        name: "PROC UNIVARIATE",
        description: "进行详细的单变量统计分析",
        syntax: "PROC UNIVARIATE DATA=dataset <options>;\n  VAR variables;\n  HISTOGRAM variables;\nRUN;",
        example: "proc univariate data=sashelp.class normal;\n  var height weight;\n  histogram / normal;\nrun;",
        category: "过程语句"
    },
    {
        name: "PROC REG",
        description: "进行线性回归分析",
        syntax: "PROC REG DATA=dataset;\n  MODEL dependent=independents;\nRUN;",
        example: "proc reg data=sashelp.class;\n  model weight = height age;\nrun;",
        category: "过程语句"
    },
    {
        name: "PROC CORR",
        description: "计算相关系数",
        syntax: "PROC CORR DATA=dataset <options>;\n  VAR variables;\nRUN;",
        example: "proc corr data=sashelp.class pearson;\n  var height weight age;\nrun;",
        category: "过程语句"
    },
    {
        name: "PROC TRANSPOSE",
        description: "转置数据集",
        syntax: "PROC TRANSPOSE DATA=dataset OUT=output-dataset;\n  BY variables;\n  VAR variables;\nRUN;",
        example: "proc transpose data=sashelp.class out=class_t;\n  by name;\n  var height weight;\nrun;",
        category: "过程语句"
    },
    {
        name: "PROC TABULATE",
        description: "创建交叉表格报告",
        syntax: "PROC TABULATE DATA=dataset;\n  CLASS variables;\n  VAR variables;\n  TABLE page,row*col;\nRUN;",
        example: "proc tabulate data=sashelp.class;\n  class sex age;\n  var height weight;\n  table sex,age*(height*mean weight*mean);\nrun;",
        category: "过程语句"
    },
    // 添加高级统计分析过程
    {
        name: "PROC MIXED",
        description: "进行混合线性模型分析，处理重复测量随机效应",
        syntax: "PROC MIXED DATA=dataset <options>;\n  CLASS variables;\n  MODEL dependent = independents </ options>;\n  RANDOM effects;\n  REPEATED effect / options;\nRUN;",
        example: "proc mixed data=sashelp.class;\n  class sex;\n  model weight = height age sex / solution;\n  random intercept / subject=class;\nrun;",
        category: "高级统计过程"
    },
    {
        name: "PROC GLM",
        description: "进行一般线性模型分析，包括方差分析和协方差分析",
        syntax: "PROC GLM DATA=dataset <options>;\n  CLASS variables;\n  MODEL dependent = independents </ options>;\n  MEANS effects;\n  LSMEANS effects;\nRUN;",
        example: "proc glm data=sashelp.class;\n  class sex;\n  model weight = height sex height*sex;\n  lsmeans sex;\nrun;",
        category: "高级统计过程"
    },
    {
        name: "PROC LOGISTIC",
        description: "进行逻辑回归分析",
        syntax: "PROC LOGISTIC DATA=dataset <options>;\n  CLASS variables;\n  MODEL dependent(event='level') = independents </ options>;\nRUN;",
        example: "proc logistic data=sashelp.heart;\n  class sex;\n  model status(event='1') = sex age bp;\nrun;",
        category: "高级统计过程"
    },
    {
        name: "PROC GENMOD",
        description: "进行广义线性模型分析",
        syntax: "PROC GENMOD DATA=dataset;\n  CLASS variables;\n  MODEL dependent = independents / DIST=distribution LINK=function;\nRUN;",
        example: "proc genmod data=sashelp.heart;\n  class sex;\n  model status = sex age / dist=binomial link=logit;\nrun;",
        category: "高级统计过程"
    },
    {
        name: "PROC GLIMMIX",
        description: "进行广义线性混合模型分析",
        syntax: "PROC GLIMMIX DATA=dataset;\n  CLASS variables;\n  MODEL dependent = independents / DIST=distribution;\n  RANDOM effects;\nRUN;",
        example: "proc glimmix data=sashelp.heart;\n  class sex;\n  model status = age / dist=binary;\n  random intercept / subject=sex;\nrun;",
        category: "高级统计过程"
    },
    {
        name: "PROC FACTOR",
        description: "进行因子分析",
        syntax: "PROC FACTOR DATA=dataset METHOD=method ROTATE=rotation;\n  VAR variables;\nRUN;",
        example: "proc factor data=sashelp.heart method=principal rotate=varimax;\n  var systolic diastolic cholesterol;\nrun;",
        category: "高级统计过程"
    },
    {
        name: "PROC CLUSTER",
        description: "进行聚类分析",
        syntax: "PROC CLUSTER DATA=dataset METHOD=method;\n  VAR variables;\nRUN;",
        example: "proc cluster data=sashelp.class method=ward;\n  var height weight;\nrun;",
        category: "高级统计过程"
    },
    {
        name: "PROC LIFETEST",
        description: "进行生存分析",
        syntax: "PROC LIFETEST DATA=dataset <options>;\n  TIME variable*censor(0);\n  STRATA variables;\nRUN;",
        example: "proc lifetest data=sashelp.heart;\n  time days*status(0);\n  strata sex;\nrun;",
        category: "高级统计过程"
    },
    {
        name: "PROC PHREG",
        description: "进行比例风险回归分析",
        syntax: "PROC PHREG DATA=dataset;\n  CLASS variables;\n  MODEL time*censor(0) = independents;\nRUN;",
        example: "proc phreg data=sashelp.heart;\n  class sex;\n  model days*status(0) = sex age bp;\nrun;",
        category: "高级统计过程"
    },
    // 正态分布相关函数
    {
        name: "NORMAL",
        description: "计算正态分布的概率密度或累积分布",
        syntax: "PDF('NORMAL', x <, μ, σ>) 或 CDF('NORMAL', x <, μ, σ>)",
        example: "prob = CDF('NORMAL', 1.96, 0, 1); /* 标准正态分布的0.975分位点 */",
        category: "概率函数"
    },
    {
        name: "PROBNORM",
        description: "计算标准正态分布的累积概率",
        syntax: "PROBNORM(x)",
        example: "prob = PROBNORM(1.96); /* 返回 0.975 */",
        category: "概率函数"
    },
    {
        name: "PROBIT",
        description: "计算标准正态分布的分位数",
        syntax: "PROBIT(p)",
        example: "x = PROBIT(0.975); /* 返回 1.96 */",
        category: "概率函数"
    },
    {
        name: "NORMSINV",
        description: "计算标准正态分布的反函数（分位数）",
        syntax: "NORMSINV(p)",
        example: "x = NORMSINV(0.975); /* 返回 1.96 */",
        category: "概率函数"
    },
    {
        name: "NORMINV",
        description: "计算一般正态分布的反函数",
        syntax: "NORMINV(p, μ, σ)",
        example: "x = NORMINV(0.975, 100, 15); /* 返回 μ+1.96σ */",
        category: "概率函数"
    },

    // 其他重要概率分布函数
    {
        name: "PROBCHI",
        description: "计算卡方分布的累积概率",
        syntax: "PROBCHI(x, df)",
        example: "prob = PROBCHI(3.84, 1); /* 自由度为1的卡方分布P值 */",
        category: "概率函数"
    },
    {
        name: "PROBT",
        description: "计算t分布的累积概率",
        syntax: "PROBT(x, df)",
        example: "prob = PROBT(2.0, 30); /* 自由度为30的t分布P值 */",
        category: "概率函数"
    },
    {
        name: "PROBF",
        description: "计算F分布的累积概率",
        syntax: "PROBF(x, ndf, ddf)",
        example: "prob = PROBF(4.0, 1, 30); /* F分布的P值 */",
        category: "概率函数"
    },
    {
        name: "CINV",
        description: "计算卡方分布的分位数",
        syntax: "CINV(p, df)",
        example: "x = CINV(0.95, 1); /* 自由度为1的卡方分布0.95分位数 */",
        category: "概率函数"
    },
    {
        name: "TINV",
        description: "计算t分布的分位数",
        syntax: "TINV(p, df)",
        example: "x = TINV(0.975, 30); /* 自由度为30的t分布0.975分位数 */",
        category: "概率函数"
    },
    {
        name: "FINV",
        description: "计算F分布的分位数",
        syntax: "FINV(p, ndf, ddf)",
        example: "x = FINV(0.95, 1, 30); /* F分布的0.95分位数 */",
        category: "概率函数"
    },
    {
        name: "BETAINV",
        description: "计算Beta分布的分位数",
        syntax: "BETAINV(p, a, b)",
        example: "x = BETAINV(0.95, 2, 3); /* Beta分布的0.95分位数 */",
        category: "概率函数"
    },
    {
        name: "GAMINV",
        description: "计算Gamma分布的分位数",
        syntax: "GAMINV(p, shape)",
        example: "x = GAMINV(0.95, 2); /* Gamma分布的0.95分位数 */",
        category: "概率函数"
    },

    // 临床试验分析过程
    {
        name: "PROC POWER",
        description: "进行样本量和检验效能计算",
        syntax: "PROC POWER;\n  TWOSAMPLEFREQ TEST=FISHER\n    GROUPPROPORTIONS=(p1 p2)\n    NTOTAL=.\n    POWER=0.8;\nRUN;",
        example: "proc power;\n  twosamplefreq test=fisher\n    groupproportions=(.2 .4)\n    ntotal=.\n    power=0.8;\nrun;",
        category: "临床试验分析"
    },
    {
        name: "PROC SEQDESIGN",
        description: "设计群序分析临床试验",
        syntax: "PROC SEQDESIGN <options>;\n  DESIGN nstages=k\n    METHOD=method\n    ALT=alternative;\nRUN;",
        example: "proc seqdesign altref=0.5;\n  design nstages=3\n    method=obf\n    alt=twosided;\nrun;",
        category: "临床试验分析"
    },
    {
        name: "PROC SEQTEST",
        description: "进行群序分析的中期分析",
        syntax: "PROC SEQTEST <options>\n  BOUNDARY=SAS-data-set;\nRUN;",
        example: "proc seqtest boundary=bnd_set\n  parms(theta=0.5)=parm_set;\nrun;",
        category: "临床试验分析"
    },

    // 生存分析高级函数
    {
        name: "PROC ICLIFETEST",
        description: "区间删失数据的非参数生存分析",
        syntax: "PROC ICLIFETEST DATA=dataset <options>;\n  TIME (left,right);\n  STRATA variables;\nRUN;",
        example: "proc iclifetest data=interval;\n  time (ltime, rtime);\n  strata gender;\nrun;",
        category: "生存分析"
    },
    {
        name: "PROC ICPHREG",
        description: "区间删失数据的比例风险回归",
        syntax: "PROC ICPHREG DATA=dataset;\n  MODEL (left,right) = covariates;\n  CLASS variables;\nRUN;",
        example: "proc icphreg data=interval;\n  model (ltime, rtime) = age gender;\n  class gender;\nrun;",
        category: "生存分析"
    },
    {
        name: "PROC RELIABILITY",
        description: "可靠性和生存分析",
        syntax: "PROC RELIABILITY DATA=dataset;\n  DISTRIBUTION distribution;\n  ANALYZE variables;\nRUN;",
        example: "proc reliability data=failure;\n  distribution weibull;\n  analyze time*status(0);\nrun;",
        category: "生存分析"
    },

    // 重复测量分析
    {
        name: "PROC GEE",
        description: "广义估计方程分析",
        syntax: "PROC GEE DATA=dataset;\n  CLASS variables;\n  MODEL response = predictors / DIST= LINK=;\n  REPEATED SUBJECT=subject / TYPE=corr;\nRUN;",
        example: "proc gee data=longitudinal;\n  class id time;\n  model y = time trt time*trt / dist=normal;\n  repeated subject=id / type=ar(1);\nrun;",
        category: "重复测量分析"
    },
    {
        name: "PROC NLMIXED",
        description: "非线性混合效应模型",
        syntax: "PROC NLMIXED DATA=dataset;\n  PARMS parameters;\n  MODEL dependent ~ distribution;\n  RANDOM random_effects ~ NORMAL(0,var) SUBJECT=subject;\nRUN;",
        example: "proc nlmixed data=growth;\n  parms beta0=5 beta1=3 s2u=1 s2e=2;\n  model y ~ normal(beta0+beta1*x+u, s2e);\n  random u ~ normal(0,s2u) subject=id;\nrun;",
        category: "重复测量分析"
    },

    // 临床试验特定函数
    {
        name: "AVAL_CALC",
        description: "计算分析值（常用于CDISC标准）",
        syntax: "AVAL = expression;\nCHG = AVAL - BASE;\nPCHG = 100 * (AVAL - BASE) / BASE;",
        example: "aval = log(measurement);\nchg = aval - base;\npchg = 100 * (aval - base) / base;",
        category: "临床试验函数"
    },
    {
        name: "LOCF",
        description: "末次观察值结转",
        syntax: "IF NOT MISSING(value) THEN last_value = value;\nIF MISSING(value) THEN value = last_value;",
        example: "if not missing(result) then last_result = result;\nif missing(result) then result = last_result;",
        category: "临床试验函数"
    },

    // 生物等效性分析
    {
        name: "PROC TTEST",
        description: "用于生物等效性分析的t检验",
        syntax: "PROC TTEST DATA=dataset TOST=equivalence_limits;\n  PAIRED response1*response2;\n  VAR difference;\nRUN;",
        example: "proc ttest data=bioequiv tost=(-0.2, 0.2);\n  paired test*ref;\nrun;",
        category: "生物等效性分析"
    },

    // 安全性分析
    {
        name: "PROC FREQ_AE",
        description: "不良事件频数分析",
        syntax: "PROC FREQ DATA=dataset;\n  TABLES treatment*ae / NOCOL NOPERCENT;\n  BY soc pt;\nRUN;",
        example: "proc freq data=adverse_events;\n  tables trt*aept / nocol nopercent;\n  by aesoc;\nrun;",
        category: "安全性分析"
    },

    // 人口统计学分析
    {
        name: "PROC TABULATE_DEMO",
        description: "人口统计学特征汇总表",
        syntax: "PROC TABULATE DATA=dataset;\n  CLASS treatment;\n  VAR age weight height;\n  TABLE treatment*(age weight height)*(n mean std);\nRUN;",
        example: "proc tabulate data=demog;\n  class trt;\n  var age bmi;\n  table trt*(age bmi)*(n mean std);\nrun;",
        category: "人口统计学分析"
    }
]; 