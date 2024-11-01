const sasFunctions = [
    {
        name: "ABS",
        description: "返回数值的绝对值。此函数可用于数值型和货币型数据。",
        syntax: "ABS(numeric)",
        details: `功能说明：
1. 参数类型：
   - numeric: 数值型或货币型表达式

2. 返回值：
   - 类型：数值
   - 范围：非负数
   - 精度：与输入值相同

3. 特殊情况处理：
   - 缺失值：返回缺失值
   - 负数：返回其正值
   - 零：返回零
   - 非数值：产生错误

4. 使用注意：
   - 可用于DATA步和PROC步
   - 支持WHERE表达式
   - 可嵌套在其他函数中使用`,
        example: `/* 示例1：基本用法 */
data test;
   x1 = ABS(-5.2);    /* 返回 5.2 */
   x2 = ABS(3.7);     /* 返回 3.7 */
   x3 = ABS(0);       /* 返回 0 */
   x4 = ABS(.);       /* 返回 . (缺失值) */
run;

/* 示例2：在计算中使用 */
data distance;
   x1 = 10; x2 = 15;
   dist = ABS(x1 - x2);  /* 计算两点间距离 */
run;`,
        category: "数学函数",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/lefunctionsref/p0tj6uo0mwp3zfn1r0qs9qkf91t3.htm
2. 用法示例：https://support.sas.com/kb/24/590.html`
    },
    {
        name: "PROC MIXED",
        description: "PROC MIXED 过程用于拟合混合线性模型，特别适用于处理含有相关误差的数据（如重复测量、纵向数据、多层数据等）。它支持固定效应、随机效应和各种协方差结构。",
        syntax: `PROC MIXED <options>;
    CLASS variables;
    MODEL dependent = fixed-effects </options>;
    RANDOM random-effects </options>;
    REPEATED </options>;
    PARMS </options>;
    CONTRAST 'label' effect values </options>;
    ESTIMATE 'label' effect values </options>;
    LSMEANS effects </options>;
    WEIGHT variable;
    ID variables;
RUN;`,
        details: `1. PROC MIXED 语句选项：
   - DATA=: 指定输入数据集
   - METHOD=: 估计方法
     * REML: 限制最大似然（默认）
     * ML: 最大似然
     * MIVQUE0: 最小方差二次无偏估计
   - IC: 显示信息准则（AIC, AICC, BIC, HQIC）
   - NOCLPRINT: 抑制CLASS水平显示
   - PLOTS=: 控制图形输出

2. MODEL 语句选项：
   - SOLUTION: 显示固定效应参数估计
   - DDFM=: 分母自由度方法
     * CONTAIN: 包含法（默认）
     * BETWITHIN: Between-Within法
     * SATTERTHWAITE: Satterthwaite近似
     * KENWARDROGER: Kenward-Roger法
   - CL: 显示置信区间
   - ALPHA=: 显著性水平（默认0.05）
   - OUTPM=: 输出预测均值
   - RESIDUAL: 输出残差

3. RANDOM 语句选项：
   - SUBJECT=: 指定随机效应主体
   - TYPE=: 协方差结构类型
     * VC: 方差分量（默认）
     * UN: 非结构化
     * CS: 复合对称
     * AR(1): 一阶自回归
   - G: 显示G矩阵
   - SOLUTION: 显示随机效应预测值

4. REPEATED 语句选项：
   - SUBJECT=: 指定重复测量主体
   - TYPE=: R矩阵协方差结构
   - R: 显示R矩阵
   - GROUP=: 异质方差分组

5. 常用协方差结构：
   - CS: 复合对称
   - UN: 非结构化
   - AR(1): 一阶自回归
   - TOEP: Toeplitz
   - SP(POW): 空间幂

6. 模型诊断：
   - -2 Log Likelihood
   - AIC (Akaike Information Criterion)
   - AICC (Corrected AIC)
   - BIC (Bayesian Information Criterion)
   - Null Model LRT
   - 残差分析
   - 影响诊断

7. 输出解释：
   - Solution for Fixed Effects
   - Solution for Random Effects
   - Type 3 Tests of Fixed Effects
   - Covariance Parameter Estimates
   - Fit Statistics
   - Least Squares Means`,
        example: `/* 示例1：基本重复测量分析 */
proc mixed data=study;
    class subject treatment time;
    model response = treatment time treatment*time / solution;
    random intercept / subject=subject type=un;
    repeated / type=ar(1) subject=subject;
    lsmeans treatment*time / slice=time diff cl;
run;

/* 示例2：多层模型（嵌套设计）*/
proc mixed data=school;
    class school class student;
    model score = gender age / solution cl;
    random intercept / subject=school;
    random intercept / subject=class(school);
    estimate 'Gender Effect' gender 1 -1;
run;

/* 示例3：异质方差模型 */
proc mixed data=longitudinal;
    class patient group time;
    model y = group time group*time / solution;
    repeated time / subject=patient group=group type=un;
    lsmeans group*time / slice=time;
run;`,
        category: "高级统计过程",
        references: `参考资料：
1. SAS官方文档：
   - 主要文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/statug/statug_mixed_toc.htm
   - 语法完整参考：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/statug/statug_mixed_syntax.htm
   - 示例：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/statug/statug_mixed_examples.htm

2. 技术说明：
   - 协方差结构：https://support.sas.com/resources/papers/proceedings/proceedings/sugi30/198-30.pdf
   - 缺失数据处理：https://support.sas.com/resources/papers/proceedings/proceedings/sugi30/199-30.pdf

3. 实用指南：
   - 混合模型诊断：https://support.sas.com/resources/papers/proceedings/proceedings/sugi31/188-31.pdf
   - 最佳实践：https://support.sas.com/resources/papers/proceedings/proceedings/sugi31/189-31.pdf`
    },
    {
        name: "PROC TTEST",
        description: "执行t检验，包括单样本、配对样本和双样本t检验。常用于生物等效性研究、临床试验的组间比较等。",
        syntax: `PROC TTEST DATA=dataset <options>;
    CLASS variable;
    PAIRED variables;
    VAR variables;
RUN;`,
        details: `主要参数说明：

1. DATA= 选项：
   指定输入数据集

2. CLASS 语句：
   用于指定分组变量（双样本t检验）

3. PAIRED 语句：
   用于指定配对比较的变量（配对t检验）

4. VAR 语句：
   指定要分析的变量

5. 重要选项：
   - ALPHA=: 显著性水平
   - DIST=: 分布类型
   - H0=: 原假设的值
   - SIDES=: 单尾或双尾检验
   - TOST=: 等效性界值
   - PLOTS=: 控制图形输出

输出说明：
- 描述性统计量
- t统计量
- 自由度
- p值
- 置信区间
- 等效性检验果（如果指定）`,
        example: `/* 示例1：双样本t检验 */
proc ttest data=clinical;
    class treatment;    /* 分组变量 */
    var response;       /* 响应变量 */
run;

/* 示例2：生物等效性检验 */
proc ttest data=bioequiv tost=(-0.2, 0.2);
    paired test_drug*reference_drug;
run;

/* 示例3：单样本t检验 */
proc ttest data=clinical h0=0;
    var change_from_baseline;
run;`,
        category: "统计检验",
        references: `原始文档：
SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/statug/statug_ttest_syntax.htm

相关主题：
1. 生物等效性分析
2. 临床试验组间比较
3. 配对数据分析`
    },
    {
        name: "PROC LIFETEST",
        description: "用于生存分析的非参数方法，可以计算Kaplan-Meier生存曲线、生存函数估计和组间比较。常用于临床试验中的生存数据分析。",
        syntax: `PROC LIFETEST DATA=dataset <options>;
    TIME variable <*censor(value)>;
    STRATA variables </options>;
    TEST variables;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - DATA=: 输入数据集
   - ALPHA=: 显著性水平（默认0.05）
   - METHOD=: 估计方法
     * KM: Kaplan-Meier方法（默认）
     * LT: 寿命法
     * PL: Product-Limit方法

2. TIME 语句：
   - variable: 生存时间变量
   - censor: 删失指示变量
   - value: 删失值（通常0表示删失）

3. STRATA 语句
   - TEST=: 检验方
     * LOGRANK: Log-rank检验
     * WILCOXON: Wilcoxon检验
   - DIFF=: 组间差异类型
   - ADJUST=: 多重比较调整方法

4. 图形选项：
   - PLOTS=: 控制图形输出
     * SURVIVAL: 生存曲线
     * HAZARD: 风险函数
     * CIF: 累积发生率函数

5. 输出内容：
   - 生存函数估计
   - 中位生存时间
   - 组间比较的检验结果
   - 风险比估计（如果指定）`,
        example: `/* 示例1：基本生存分析 */
proc lifetest data=cancer plots=survival(cb=hw);
    time survival*status(0);
    strata group;
run;

/* 示例2：多组比较和调整 */
proc lifetest data=clinical plots=(survival(cb=hw) hazard);
    time time_to_event*censor(0);
    strata treatment / test=(logrank wilcoxon) adjust=sidak;
run;

/* 示例3：累积发生率分析 */
proc lifetest data=competing_risk plots=cif;
    time followup*status(0);
    strata group / test=gray;
run;`,
        category: "生存分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/statug/statug_lifetest_syntax.htm

相关主题：
1. 生存分析基础
2. 竞争风险分析
3. 生存曲线比较
4. 临床试验中的生存数据分析`
    },
    {
        name: "PROC PHREG",
        description: "执行Cox比例风险回归分析，用于评估协变量对生存时间的影响。常用于临床试验中的生存数据分和预后因素研究。",
        syntax: `PROC PHREG DATA=dataset <options>;
    CLASS variables </options>;
    MODEL time*censor(value) = variables </options>;
    STRATA variables;
    ASSESS <VAR=variables> </options>;
    BASELINE <OUT=dataset> </options>;
    TEST equation </options>;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - DATA=: 输入数据集
   - ALPHA=: 显著性水平（默认0.05）
   - TIES=: 处理同时事件的方法
     * BRESLOW: Breslow近似（默认）
     * EXACT: 精确法
     * EFRON: Efron近似

2. CLASS 语句
   - 指定分类变量
   - 可设置参考水平
   - 支持交互效应

3. MODEL 语句：
   - time: 生存时间变量
   - censor: 删失指示变量
   - value: 删失值（通常0表示删失）
   选项：
   - RISKLIMITS: 风险比及置信区间
   - SELECTION=: 变量选择方法
   - TYPE3: Type 3 检验

4. ASSESS 语句：
   - 评PH假设
   - 残差分析
   - 模型诊断

5. BASELINE 语句：
   - 输出基线生存函数
   - 计算预测生存概率

输出说明：
- 参数估计及标准误
- 风险比及置信区间
- Wald检验结果
- 似然比检验
- 模型拟合优度统计量`,
        example: `/* 示例1：基本Cox回归 */
proc phreg data=clinical;
    class treatment (ref='0') gender;
    model time*status(0) = treatment age gender / risklimits;
run;

/* 示例2：分层Cox模型 */
proc phreg data=study;
    class trt (ref='0');
    model time*death(0) = trt age / risklimits;
    strata center;
    baseline out=pred survival=surv;
run;

/* 示例3：时依协变量 */
proc phreg data=longitudinal;
    class group;
    model time*event(0) = group age time_dep;
    assess ph / resample;
run;`,
        category: "生存分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/statug/statug_phreg_syntax.htm

相关主题：
1. 比例风险模型
2. 生存分析
3. 预后因素分析
4. 临床试验数据分析`
    },
    {
        name: "PROC POWER",
        description: "用于样本量和统计检验效能的计算，常用于临床试验设计阶段。",
        syntax: `PROC POWER;
    ONECORR </options>;    /* 相关系数检验 */
    ONESAMPLEFREQ </options>;    /* 单样本比例检验 */
    ONESAMPLEMEANS </options>;   /* 单样本均值检验 */
    ONEWAYANOVA </options>;      /* 单因素方差分析 */
    PAIREDFREQ </options>;       /* 配对比例检验 */
    PAIREDMEANS </options>;      /* 配对均值检验 */
    TWOSAMPLEFREQ </options>;    /* 双样本比例检验 */
    TWOSAMPLEMEANS </options>;   /* 双样本均值检验 */
    TWOSAMPLESURVIVAL </options>; /* 生存分析样本量 */
RUN;`,
        details: `主要参数说明：

1. 通用选项：
   - ALPHA=: 显著性水平
   - POWER=: 目标检验效能
   - NTOTAL=: 总本量
   - OUTPUTORDER=: 输出排方

2. 各分析类型特定参数：
   TWOSAMPLEMEANS（最常用）:
   - MEANDIFF=: 均值差
   - GROUPMEANS=: 各组均值
   - STDDEV=: 标准差
   - GROUPWEIGHTS=: 分配比
   - SIDES=: 单尾或双尾检验

   TWOSAMPLEFREQ:
   - GROUPPROPORTIONS=: 各组比例
   - REFPROPORTION=: 参考组比例
   - ODDSRATIO=: 优势比
   - RELATIVERISK=: 相对危险度

   TWOSAMPLESURVIVAL:
   - HAZARDRATIO=: 风险比
   - ACCRUALTIME=: 入组时间
   - FOLLOWUPTIME=: 随访时间
   - GROUPSURVIVAL=: 各组生存率

3. 输出内容：
   - 所需样本量
   - 实际效能
   - 检测到的效应量
   - 关键参数汇总`,
        example: `/* 示例1：两组均值比较的样本量 */
proc power;
    twosamplemeans
        meandiff = 5
        stddev = 12
        power = 0.8
        ntotal = .
        alpha = 0.05;
run;

/* 示例2：生存分析的样本量 */
proc power;
    twosamplesurvival
        hazardratio = 0.6
        accrualtime = 12
        followuptime = 18
        power = 0.8
        ntotal = .
        alpha = 0.05;
run;

/* 示例3：等效性试验的样本量 */
proc power;
    twosamplemeans
        meandiff = 0
        stddev = 10
        power = 0.9
        ntotal = .
        alpha = 0.05
        sides = u
        equivalence
        boundaries = (-3 3);
run;`,
        category: "临床试验设计",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_power_syntax.htm

相关主题：
1. 临床试验设计
2. 样本量计算
3. 检验效能分析
4. 等效性试验设计`
    },
    {
        name: "PROC GEE",
        description: "使用广义估计方程方法分析纵向数据和其他相关数据。特别适用于处理非正态分布的重复测量数据。",
        syntax: `PROC GEE DATA=dataset;
    CLASS variables;
    MODEL response = predictors / DIST= LINK= ;
    REPEATED SUBJECT=subject / TYPE= WITHIN=time;
    LSMEANS effects / DIFF;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - DATA=: 输入数据集
   - DIST=: 响应变量分布
     * NORMAL: 正态分布
     * BINOMIAL: 二项分布
     * POISSON: 泊松分布
   - LINK=: 连接函数
     * IDENTITY: 恒等连
     * LOGIT: Logit连接
     * LOG: 对数连接

2. REPEATED 语句选项：
   - SUBJECT=: 指定受试者标识
   - TYPE=: 工作相关矩阵结构
     * IND: 独立
     * AR(1): 一阶自回归
     * EXCH: 可交换
     * UNSTR: 非结构化
   - WITHIN=: 时间变量

3. 输出内容：
   - 参数估计
   - 经验标准误
   - 工作相关矩阵
   - Type 3 分析
   - 最小二乘均值`,
        example: `/* 示例1：连续性结局变量分析 */
proc gee data=longitudinal;
    class id time treatment;
    model response = treatment time treatment*time / dist=normal;
    repeated subject=id / type=ar(1) within=time;
    lsmeans treatment*time / diff;
run;

/* 示例2：二分类结局变量分析 */
proc gee data=binary;
    class id time group;
    model success(event='1') = group time / dist=binomial link=logit;
    repeated subject=id / type=unstr;
run;`,
        category: "重复测量分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_genmod_syntax.htm

相关主题：
1. 纵向数据分析
2. 重复测量数据
3. 广义线性模型
4. 相关数据分析`
    },
    {
        name: "PROC GLIMMIX",
        description: "用于拟合广义线性混合模型，可处理非正态分的应量，支效复数据适于分类、计数、有序分类等多种类型的结局变量。",
        syntax: `PROC GLIMMIX DATA=dataset <options>;
    CLASS variables;
    MODEL response = fixed-effects / DIST= LINK= <options>;
    RANDOM random-effects / SUBJECT= TYPE= <options>;
    NLOPTIONS <options>;
    LSMEANS effects / DIFF <options>;
    COVTEST <options>;
RUN;`,
        details: `主要参数说明：

1. MODEL语句选项：
   - DIST=: 响应变量分布
     * BINARY: 二项分布
     * POISSON: 泊松分布
     * NORMAL: 正态分布
     * GAMMA: 伽马分布
     * MULTINOMIAL: 多项分布
   - LINK=: 连接函数
     * LOGIT: logit连接（二项）
     * LOG: 对数连接（泊
     * IDENTITY: 恒等连接（正态）
     * CUMLOGIT: 累积logit（有序）

2. RANDOM语句选项：
   - SUBJECT=: 随机效应主体
   - TYPE=: 协方差结构
     * UN: 非结构化
     * AR(1): 一阶自回归
     * CS: 复合对称
   - G: 显示G矩阵
   - SOLUTION: 显示随机效应预测值

3. 估计方法选项：
   - METHOD=: 估计方法
     * RSPL: 限制伪似然（默认）
     * MSPL: 最大伪似然
     * LAPLACE: 拉普拉斯近似
     * QUAD: 自适应求积

4. 输出选项：
   - ODDSRATIO: 优势比估计
   - PLOTS=: 诊断
   - CL: 信区间
   - DDFM=: 自由度方法`,
        example: `/* 示例1：二分类结局变量分析 */
proc glimmix data=clinical;
    class treatment center patient;
    model response(event='1') = treatment time treatment*time / 
          dist=binary link=logit solution oddsratio;
    random intercept / subject=patient type=ar(1);
    lsmeans treatment*time / slice=time diff odds;
run;

/* 示例2：计数数据分析 */
proc glimmix data=adverse_events;
    class subject treatment;
    model count = treatment time / dist=poisson link=log;
    random _residual_ / subject=subject type=ar(1);
    lsmeans treatment / diff=all plot=diff;
run;

/* 示例3：有序分类数据分析 */
proc glimmix data=ordinal;
    class patient treatment;
    model score = treatment baseline / 
          dist=multinomial link=cumlogit solution;
    random intercept / subject=patient;
    lsmeans treatment / odds;
run;`,
        category: "重复测量分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_glimmix_syntax.htm

相关主题：
1. 广义线性混合模型
2. 重复测量数据分析
3. 非正态数据分析
4. 临床试验数据分析`
    },
    {
        name: "PROC MULTTEST",
        description: "用于多重比和多重检验的调整，特别适用��临床试验中的多个终点分析和基因表达数据分析。",
        syntax: `PROC MULTTEST DATA=dataset <options>;
    CLASS variables;
    TEST name(variables </options>);
    CONTRAST 'label' values;
    BY variables;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - DATA=: 输入数据集
   - OUT=: 输出数据集
   - OUTPERM=: 输出置换数据集
   - SEED=: 随机数种子
   - NSAMPLE=: 重抽样次数

2. 多重比较调整方法：
   - ADAPTIVEHOLM
   - ADAPTIVEHOCHBERG
   - BONFERRONI
   - BOOTSTRAP
   - FDR (False Discovery Rate)
   - HOCHBERG
   - HOLM
   - SIDAK
   - STEPBON
   - STEPDOWN
   - PERMUTATION

3. TEST语句选项：
   支持的检验类型：
   - MEAN: t检验
   - FISHER: Fisher精确检验
   - PETO: Peto检验
   - CA: Cochran-Armitage趋势检验
   - FREEMAN: Freeman-Tukey检验

4. 输出内容：
   - 原始p值
   - 调整后p值
   - 检验统计量
   - 拒绝原假设的决定`,
        example: `/* 示例1：多个终点的分析 */
proc multtest data=clinical bootstrap nsample=10000;
    class treatment;
    test mean(endpoint1-endpoint5);
    contrast 'Treatment Effect' 1 -1;
run;

/* 示例2：使用FDR方法 */
proc multtest data=gene_expression fdr;
    test fisher(gene1-gene1000);
run;

/* 示例3：多个安全性指标的分析 */
proc multtest data=safety bonferroni;
    class treatment;
    test fisher(ae1-ae20);
    contrast 'Treatment vs Control' 1 -1;
run;`,
        category: "多重比较",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_multtest_syntax.htm

相关主题：
1. 多重检验
2. 多个终点分析
3. 基因表达数据分析
4. 安性分析`
    },
    {
        name: "PROC FREQ",
        description: "用于分类数据分析，包括频数统计、列联表分析、一致性检验等。在临床试验中常用于人口统计学特征分析、安全性分析和分类结局的分析。",
        syntax: `PROC FREQ DATA=dataset <options>;
    TABLES requests / options;
    TEST options;
    EXACT statistic-options / options;
    WEIGHT variable;
    BY variables;
RUN;`,
        details: `主要参数说明：

1. TABLES 语句选项：
   - 基本统计量：
     * NOCUM: 不显示累积统计量
     * NOPERCENT: 不显示百分比
     * MISSING: 包含缺失值
   
   - 相关性统计：
     * CHISQ: 卡方检验
     * MEASURES: 相关性度量
     * AGREE: 一致性统计量
     * CMH: Cochran-Mantel-Haenszel统计量
   
   - 相对风险：
     * RELRISK: 相对风险度量
     * OR: 优势比
     * RISKDIFF: 风险差

2. EXACT 语句：
   精确检验选项：
   - FISHER: Fisher精确检验
   - BARNARD: Barnard精确检验
   - MCNEM: McNemar检验
   - TREND: Cochran-Armitage趋势检验

3. 常用输出：
   - 频数和百分比
   - 行列百分比
   - 期望频数
   - 卡方统计量
   - 相对风险比
   - 优势比
   - Fisher精确检验p值`,
        example: `/* 示例1：基本频数分析卡检验 */
proc freq data=clinical;
    tables treatment*response / chisq expected cellchi2 
           relrisk riskdiff;
    exact fisher;
run;

/* 示例2：分层分析（CMH检验）*/
proc freq data=multicenter;
    tables center*treatment*response / cmh;
run;

/* 示例3：安全性分析（不良事件统计）*/
proc freq data=adverse_events;
    tables treatment*ae_term / nocol nopct
           riskdiff(cl=wald) relrisk;
    exact fisher;
    by soc;
run;

/* 示例4：基线特征的平衡性检验 */
proc freq data=baseline;
    tables treatment*(sex race smoking) / chisq;
    exact fisher;
run;`,
        category: "分类数据分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_freq_syntax.htm

相关主题：
1. 分类数据分析
2. 安全性分析
3. 基线特征分析
4. 疗效分析（分类结局）`
    },
    {
        name: "PROC GLM for BE",
        description: "用于生物等效性研究的方差分析，特别适用于交叉设计的生物等效性试验分析。可以进行平均生物等效性、群体生物等效性和个体生物等效性分析。",
        syntax: `PROC GLM DATA=dataset;
    CLASS sequence subject period treatment;
    MODEL response = sequence subject(sequence) period treatment;
    LSMEANS treatment / PDIFF=ALL CL ALPHA=0.1;
    ESTIMATE 'Test vs. Reference' treatment 1 -1;
    OUTPUT OUT=outdata PREDICTED=pred RESIDUAL=resid;
RUN;

/* 生物等效性评价 */
PROC MIXED DATA=dataset;
    CLASS sequence subject period treatment;
    MODEL response = sequence period treatment;
    RANDOM subject(sequence);
    ESTIMATE 'T-R' treatment 1 -1;
    ODS OUTPUT Estimates=est;
RUN;

/* TOST检验 */
DATA _null_;
    SET est;
    alpha = 0.05;
    theta_l = -log(1.25);  /* 生物等效性界值 */
    theta_u = log(1.25);
    t_l = (estimate - theta_l)/stderr;
    t_u = (theta_u - estimate)/stderr;
    p_l = 1 - probt(t_l,df);
    p_u = 1 - probt(t_u,df);
    p_tost = max(p_l,p_u);
    IF p_tost < alpha THEN conclude = '生物等效';
    ELSE conclude = '生物不等效';
RUN;`,
        details: `主要参数说明：

1. 基本设计要：
   - sequence: 序列分组
   - subject: 受试者
   - period: 期别
   - treatment: 制剂
   - response: 药代动力学参数（如AUC, Cmax）

2. 统计分析考虑：
   - 固定效应：
     * sequence: 序列效应
     * period: 期别效应
     * treatment: 制剂效应
   - 随机效应：
     * subject(sequence): 受试者效应

3. 生物等效性评价：
   - 对数转换参数
   - 90%置信区间
   - 生物等性界值（通常为80%-125%）
   - TOST（双单侧检验）过程

4. 模型诊断：
   - 正态性检验
   - 方差齐性
   - 残差分析
   - 离群值检测

5. 特殊考虑：
   - 携带效应
   - 期别效应
   - 序列效应
   - 受试者效应`,
        example: `/* 示例1：基本生物等效性分析 */
proc glm data=be_study;
    class sequence subject period treatment;
    model lnAUC = sequence subject(sequence) period treatment;
    lsmeans treatment / pdiff=all cl alpha=0.1;
    estimate 'Test vs. Reference' treatment 1 -1;
run;

/* 示例2：完整的BE分析流程 */
/* 第1步：数据预处理 */
data be_data;
    set raw_data;
    lnAUC = log(AUC);
    lnCmax = log(Cmax);
run;

/* 第2步：描述性统计 */
proc means data=be_data;
    class treatment;
    var AUC Cmax lnAUC lnCmax;
run;

/* 第3步：方差分析和BE评价 */
proc mixed data=be_data;
    class sequence subject period treatment;
    model lnAUC = sequence period treatment;
    random subject(sequence);
    estimate 'T-R' treatment 1 -1;
    ods output Estimates=est_auc;
run;

/* 第4步：计算90%置信区间和BE判断 */
data be_results;
    set est_auc;
    lower_ci = exp(estimate - 1.645*stderr);
    upper_ci = exp(estimate + 1.645*stderr);
    if 0.80 <= lower_ci <= upper_ci <= 1.25 then be_conclusion = '生物等效';
    else be_conclusion = '生物不等效';
run;`,
        category: "生物等效性分析",
        references: `参考资料：
1. SAS官方文档：
   - GLM: https://documentation.sas.com/doc/en/statug/15.2/statug_glm_syntax.htm
   - MIXED: https://documentation.sas.com/doc/en/statug/15.2/statug_mixed_syntax.htm

2. FDA指南：
   - Statistical Approaches to Establishing Bioequivalence
   - https://www.fda.gov/regulatory-information/search-fda-guidance-documents

3. EMA指南：
   - Guideline on the Investigation of Bioequivalence
   - https://www.ema.europa.eu/en/investigation-bioequivalence

相关主题：
1. 物等效性评价
2. 交叉设计分析
3. TOST程序
4. 药代动力学分析`
    },
    {
        name: "PROC REPORT",
        description: "用于生成临床试验报表，特别适用于安全性分析、人口统计学和有效性分析的表格生成。支持复的表格布局和计算。",
        syntax: `PROC REPORT DATA=dataset <options>;
    COLUMN column-specification;
    DEFINE variable / options;
    COMPUTE location;
        programming-statements;
    ENDCOMP;
    BREAK location / options;
    RBREAK location / options;
RUN;`,
        details: `主要参数说明：

1. 基本语句：
   - COLUMN: 定义表格列的排列顺序和结构
   - DEFINE: 指定变量的属性和显示方式
   - COMPUTE: 创建计算列或汇总行
   - BREAK: 按分组变量创建小计
   - RBREAK: 创建总计

2. DEFINE 语句选项：
   - 显示格式：
     * DISPLAY: 显示值
     * GROUP: 分组变量
     * ANALYSIS: 分析变量
     * COMPUTED: 计算列
     * ORDER: 排序变量
   
   - 格式控制：
     * FORMAT=: 指定显示格式
     * WIDTH=: 列宽
     * SPACING=: 间距
     * STYLE=: 样式属性

3. COMPUTE 功能：
   - 计算新值
   - 条件格式化
   - 自定义显示
   - 统计计算

4. 常用统计选项：
   - N
   - MEAN
   - STD
   - MIN/MAX
   - MEDIAN
   - PCTN
   - SUM`,
        example: `/* 示例1：基本安全性分析表 */
proc report data=adverse_events nowd;
    column treatment ae_term n pctn;
    define treatment / group;
    define ae_term / group;
    define n / analysis sum 'N';
    define pctn / analysis sum '%' format=5.1;
    break after treatment / summarize;
run;

/* 示例2：带计算的人口统计学表 */
proc report data=demographics nowd;
    column group n ('Age' age_mean age_std) 
          ('Gender' male female) ('BMI' bmi_mean bmi_std);
    define group / group;
    define n / analysis sum 'N';
    define age_mean / analysis mean 'Mean' format=5.1;
    define age_std / analysis std 'SD' format=5.2;
    compute after;
        line ' ';
    endcomp;
run;

/* 示例3：复杂布局的有效性分析表 */
proc report data=efficacy nowd split='*';
    columns visit,
            ('Treatment Group' trt1 trt2)
            ('Difference' diff stderr pval);
    define visit / group;
    define trt1 / analysis mean 'Treatment 1*Mean (SD)' format=8.1;
    define trt2 / analysis mean 'Treatment 2*Mean (SD)' format=8.1;
    compute diff;
        diff = trt1.mean - trt2.mean;
    endcomp;
run;`,
        category: "报表生成",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/proc/p1qacqv7qm0i3tn1ppsfa4o227k1.htm

相关主题：
1. 临床试验报表
2. 安全性分析表
3. 人口统计学表
4. 有效性分析表`
    },
    {
        name: "LAG/DIF函数",
        description: "LAG函数用于获取变量的前一个观测值，DIF函数用于计算当前值与前一个值的差异。常用于纵向数据分析和时间序列数据处理。",
        syntax: `/* LAG函数 */
LAG<n>(variable)

/* DIF函数 */
DIF<n>(variable)`,
        details: `主要功能说明：

1. LAG函数：
   - LAG1: 前一个观测值（默认）
   - LAG2: 前两个观测值
   - LAGn: 前n个观测值
   
   特点：
   - 按照数据集的理顺序处理
   - 第一个观测的LAG值为缺失
   - 可用于BY组处理

2. DIF函数：
   - DIF1: 与前一个值的差（默认）
   - DIF2: 与前两个值的差
   - DIFn: 与前n个值的差
   
   计算方法：
   - DIF1 = 当前值 - LAG1
   - DIF2 = 当前值 - LAG2
   - DIFn = 当前值 - LAGn

3. 使用注意：
   - 需要正确的数据排序
   - BY组处理时重置
   - 处理缺失值
   - 数据步内部处理`,
        example: `/* 示例1：基本用法 */
data changes;
    set vitals;
    prev_sbp = lag(sbp);        /* 前一次收缩压 */
    sbp_change = dif(sbp);      /* 收缩压变化 */
run;

/* 示例2：多重LAG */
data multi_lag;
    set longitudinal;
    by patient;
    prev1_value = lag1(value);  /* 前1次测量值 */
    prev2_value = lag2(value);  /* 前2次测量值 */
    if first.patient then do;
        prev1_value = .;
        prev2_value = .;
    end;
run;

/* 示例3：计算变化率 */
data percent_change;
    set lab_data;
    by subject;
    prev_result = lag(result);
    if first.subject then prev_result = .;
    if prev_result ne . then
        pct_change = 100 * (result - prev_result) / prev_result;
run;`,
        category: "数据处理函数",
        references: `参考资料：
1. SAS官方文档：
   - LAG: https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/lefunctionsref/p0wa6j0ez1sdd4n1qr3p0xapgv6t.htm
   - DIF: https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/lefunctionsref/p0wa6j0ez1sdd4n1qr3p0xapgv6t.htm

相关主题：
1. 纵向据分析
2. 时间序列分析
3. 变化值计算
4. 趋势分析`
    },
    {
        name: "PROC MEANS",
        description: "用于计算描述性统计量，在临床试验中常用于连续型变量的基线特征、实验室检查和有效性指标的汇总分析。",
        syntax: `PROC MEANS DATA=dataset <options>;
    VAR variables;
    CLASS variables;
    WAYS n;
    WEIGHT variable;
    FREQ variable;
    BY variables;
    OUTPUT OUT=dataset <statistics>=<names>;
RUN;`,
        details: `主要参数说明：

1. 基本统计量选项：
   - N: 样本量
   - NMISS: 缺失值数
   - MEAN: 均值
   - STD: 标准差
   - MIN: 最小值
   - MAX: 最大值
   - MEDIAN: 中位数
   - Q1: 第一四分位数
   - Q3: 第三四分位数
   - CV: 变异系数
   - USS: 未校正平方和
   - CSS: 校正平方和
   - RANGE: 极差
   - LCLM: 均值置信下限
   - UCLM: 均值置信上限

2. CLASS语句选项：
   - 支持多重分类
   - 可指定排序方式
   - 缺失值处理
   - 显示格式控制

3. OUTPUT语句：
   - 可输出多个统计量
   - 支持自定义变量名
   - 可按组输出结果

4. 常用选项：
   - MAXDEC=: 小数位数
   - PRINTALLTYPES: 显示所有可能组合
   - ALPHA=: 置信区间水平
   - NONOBS: 不显示观测数
   - FW=: 字段度`,
        example: `/* 示例1：基本描述性统计 */
proc means data=clinical n nmiss mean std min max median;
    var age weight height bmi;
    class treatment;
run;

/* 示例2：多重分类和输出数据集 */
proc means data=lab_data mean std median q1 q3;
    class treatment visit;
    var ldl hdl tg;
    output out=stats mean=mean_ldl mean_hdl mean_tg
                     std=std_ldl std_hdl std_tg;
run;

/* 示例3：基线特征表格 */
proc means data=baseline nway noprint;
    class trt_group;
    var age weight height sbp dbp;
    output out=baseline_stats
           n=n mean=mean std=sd median=med min=min max=max;
run;

/* 示例4：实验室检查变化量分析 */
proc means data=lab_changes;
    class treatment timepoint;
    var chg_ldl chg_hdl chg_tg;
    output out=lab_stats mean=mean_chg std=std_chg;
run;`,
        category: "描述性统计",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/proc/p0f0fjpjeaco0gn1238v701ho0cp.htm

相关主题：
1. 描述性统计分析
2. 基线特征分析
3. 实验室检查分析
4. 有效性指标分析`
    },
    {
        name: "PROC SQL",
        description: "用于数据处理和查询的SQL过程，支持标准SQL语法，在临床试验数据处理中常用于数据合并、汇总和转换。",
        syntax: `PROC SQL <options>;
    SELECT columns
    FROM table(s)
    <WHERE conditions>
    <GROUP BY columns>
    <HAVING conditions>
    <ORDER BY columns>;
QUIT;`,
        details: `主要功能说明：

1. 基本查询功能：
   - SELECT: 选择列
   - FROM: 指定表
   - WHERE: 条��筛选
   - GROUP BY: 分组
   - HAVING: 分组后筛选
   - ORDER BY: 排序

2. 常用计算函数：
   - 聚合函数：
     * COUNT()
     * SUM()
     * AVG()
     * MIN()/MAX()
     * CALCULATED
   
   - 字符函数：
     * UPCASE()
     * SUBSTR()
     * TRIM()
     * CATS()

3. 表操作：
   - 连接类型：
     * INNER JOIN
     * LEFT JOIN
     * RIGHT JOIN
     * FULL JOIN
   - CREATE TABLE
   - INSERT INTO
   - UPDATE
   - DELETE

4. 临床试验常用功能：
   - 数据合并
   - 派生变量计算
   - 汇总统计
   - 数据重构
   - 重复记录处理`,
        example: `/* 示例1：基线特征汇总 */
proc sql;
    create table baseline_summary as
    select treatment,
           count(*) as n,
           avg(age) as mean_age,
           std(age) as sd_age,
           avg(weight) as mean_weight,
           std(weight) as sd_weight
    from demographics
    group by treatment;
quit;

/* 示例2：不良事件统计 */
proc sql;
    select ae_term,
           count(distinct usubjid) as n_subjects,
           calculated n_subjects / 
           (select count(distinct usubjid) from safety) 
           format=percent8.1 as pct
    from adverse_events
    group by ae_term
    having calculated n_subjects >= 3
    order by calculated n_subjects desc;
quit;

/* 示例3：实验室数据处理 */
proc sql;
    create table lab_changes as
    select a.usubjid,
           a.visit,
           a.lab_test,
           a.result as post_value,
           b.result as base_value,
           a.result - b.result as change
    from lab_data a
    left join lab_data b
    on a.usubjid = b.usubjid
    and a.lab_test = b.lab_test
    and b.visit = 'BASELINE'
    where a.visit ne 'BASELINE';
quit;`,
        category: "数据处理",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/sqlproc/titlepage.htm

相关主题：
1. 数据管理
2. 临床试验数据处理
3. 统计分析数据准备
4. 数据质量控制`
    },
    {
        name: "PROC UNIVARIATE",
        description: "提供详细的单变量描述性统计分析，包括基本统计量、分位数、极值、正态性检验等。在临床试验中常用于数据分布检查和异常值检测。",
        syntax: `PROC UNIVARIATE DATA=dataset <options>;
    VAR variables;
    CLASS variables;
    FREQ variable;
    WEIGHT variable;
    OUTPUT OUT=dataset <statistics>=<names>;
    HISTOGRAM variables </options>;
    PROBPLOT variables </options>;
    QQPLOT variables </options>;
    BY variables;
RUN;`,
        details: `主要参数说明：

1. 基本统计量：
   - 位置参数：
     * 均值
     * 中位数
     * 众数
     * 分位数
   
   - 离散程度：
     * 标准差
     * 方差
     * 变异系数
     * 极差
     * 四分位距

2. 分布特征：
   - 偏度
   - 峰度
   - 正态性检验：
     * Shapiro-Wilk
     * Kolmogorov-Smirnov
     * Anderson-Darling
     * Cramer-von Mises

3. 图形分析：
   - HISTOGRAM：直方图
   - PROBPLOT：概率图
   - QQPLOT：Q-Q图
   - BOXPLOT：箱线图

4. 异常值检测：
   - Extreme Observations
   - Missing Values
   - Outliers
   - Stem and Leaf Plot`,
        example: `/* 示例1：基本描述性统计和正态性检验 */
proc univariate data=clinical normal;
    var age weight height bmi;
    class treatment;
    histogram / normal;
    qqplot / normal(mu=est sigma=est);
run;

/* 示例2：异常值检测 */
proc univariate data=lab_data robustscale plot;
    var ldl hdl tg;
    id subject;
    output out=outliers 
           pctlpts=1 5 95 99 
           pctlpre=P;
run;

/* 示例3：按访视的实验室数据分析 */
proc univariate data=longitudinal;
    class visit;
    var change_from_baseline;
    histogram change_from_baseline / normal kernel;
    by parameter;
run;

/* 示例4：完整的分布分析 */
proc univariate data=pk_data plots;
    var auc cmax tmax;
    class treatment;
    histogram / normal(color=red w=3)
                kernel(color=blue w=3);
    probplot / normal(mu=est sigma=est);
    qqplot / normal(mu=est sigma=est);
run;`,
        category: "描述统计",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/procstat/procstat_univariate_syntax.htm

相关主题：
1. 描述性统计分析
2. 数据分布检验
3. 异常值检测
4. 图形分析`
    },
    {
        name: "PROC SGPLOT",
        description: "用于创建统计图形，支持多种图形类型，在临床试验中常用于数据可视化、趋势分析和结果展示。",
        syntax: `PROC SGPLOT DATA=dataset <options>;
    VBAR category-variable </options>;
    VBOX analysis-variable </options>;
    SCATTER X=variable Y=variable </options>;
    SERIES X=variable Y=variable </options>;
    REG X=variable Y=variable </options>;
    LOESS X=variable Y=variable </options>;
    BAND X=variable LOWER=value UPPER=value </options>;
    XAXIS options;
    YAXIS options;
    KEYLEGEND options;
RUN;`,
        details: `主要功能说明：

1. 基本图形类型：
   - VBAR/HBAR: 条形图
   - VBOX/HBOX: 箱线图
   - SCATTER: 散点图
   - SERIES: 折线图
   - REG: 回归线
   - LOESS: 平滑曲线
   - BAND: 置信带

2. 常用选项：
   - GROUP=: 分组变量
   - CATEGORY=: 分类变量
   - RESPONSE=: 响应变量
   - STAT=: 统计类型
     * MEAN
     * MEDIAN
     * SUM
     * FREQ
   
3. 轴设置：
   - XAXIS/YAXIS:
     * LABEL=: 轴标签
     * VALUES=: 刻度值
     * GRID: 网格线
     * MIN=/MAX=: 范围

4. 图例设置：
   - KEYLEGEND:
     * LOCATION=: 位置
     * ACROSS=: 排列方式
     * TITLE=: 标题`,
        example: `/* 示例1：线特征箱线图 */
proc sgplot data=baseline;
    vbox value / category=treatment group=visit;
    xaxis label="Treatment Group";
    yaxis label="Value";
    keylegend / title="Visit";
run;

/* 示例2：时间趋势图 */
proc sgplot data=efficacy;
    series x=visit y=mean / group=treatment markers;
    band x=visit lower=lcl upper=ucl / group=treatment transparency=0.5;
    xaxis label="Visit";
    yaxis label="Mean Change from Baseline";
    keylegend / title="Treatment";
run;

/* 示例3：生存曲线 */
proc sgplot data=survival;
    step x=time y=survival / group=treatment;
    scatter x=time y=survival / group=treatment markerattrs=(symbol=plus);
    xaxis label="Time (months)";
    yaxis label="Survival Probability" values=(0 to 1 by 0.2);
    keylegend / title="Treatment Group";
run;`,
        category: "图形分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/grstatproc/titlepage.htm

相关主题：
1. 临床试验数据可视化
2. 统计图形
3. 结果展示
4. 趋势分析`
    },
    {
        name: "PROC SGPANEL",
        description: "用于创建组或分面的统计图形，在临床试验中常用于按不同分组变量展示数据趋势和分布。",
        syntax: `PROC SGPANEL DATA=dataset;
    PANELBY variables </options>;
    VBAR category-variable </options>;
    VBOX analysis-variable </options>;
    SCATTER X=variable Y=variable </options>;
    SERIES X=variable Y=variable </options>;
    REFLINE values </options>;
    COLAXIS options;
    ROWAXIS options;
RUN;`,
        details: `主要参数说明：

1. PANELBY 语句：
   - 指定分组变量
   - 选项：
     * COLUMNS=: 列数
     * ROWS=: 行数
     * SPACING=: 面板间距
     * NOVARNAME: 不显示变量名
     * UNISCALE=: 坐标轴刻度

2. 图形类型：
   - VBAR/HBAR: 条形图
   - VBOX/HBOX: 箱线图
   - SCATTER: 散点图
   - SERIES: 折线图
   - HISTOGRAM: 直方图
   - DENSITY: 密度图

3. 常用选项：
   - GROUP=: 分组变量
   - RESPONSE=: 响应变量
   - STAT=: 统计类型
   - TRANSPARENCY=: 透明度
   - MARKERS: 标记点

4. 轴设置：
   - COLAXIS/ROWAXIS:
     * LABEL=: 轴标签
     * VALUES=: 刻度值
     * GRID: 网格线
     * MIN=/MAX=: 范围`,
        example: `/* 示例1：按中心的实验室数据趋势 */
proc sgpanel data=lab_data;
    panelby center / columns=3;
    series x=visit y=mean / group=treatment;
    band x=visit lower=lcl upper=ucl / group=treatment transparency=0.5;
    colaxis label="Visit";
    rowaxis label="Mean Change from Baseline";
run;

/* 示例2：多个安全性指标的箱线图 */
proc sgpanel data=safety;
    panelby parameter / columns=2 rows=2;
    vbox value / category=treatment group=visit;
    colaxis label="Treatment Group";
    rowaxis label="Value";
run;

/* 示例3：按亚组的疗效分析 */
proc sgpanel data=efficacy;
    panelby sex age_group / onepanel;
    scatter x=baseline y=change / group=treatment;
    reg x=baseline y=change / group=treatment;
    colaxis label="Baseline Value";
    rowaxis label="Change from Baseline";
run;`,
        category: "图形分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/grstatproc/p0f0fjp8g4o4p3n1rw6lf5t8z507.htm

相关主题：
1. 临床试验数据可视化
2. 分组分析
3. 趋势分析
4. 安全性分析图形`
    },
    {
        name: "PROC SGSCATTER",
        description: "用于创建散点图矩阵和组合图形，在临床试验中常用于多变量关系的探索性分析和相关性分析。",
        syntax: `PROC SGSCATTER DATA=dataset <options>;
    MATRIX variables </options>;
    PLOT (y-variables)*(x-variables) </options>;
    COMPARE (y-variables)*(x-variables) </options>;
RUN;`,
        details: `主要参数说明：

1. MATRIX 语句：
   - 创建散点图矩阵
   - 选项：
     * GROUP=: 分组变量
     * DIAGONAL=: 对角线图形类型
     * ELLIPSE=: 添加置信椭圆
     * TRANSPARENCY=: 透明度

2. PLOT 语句：
   - 创建多个散点图
   - 选项：
     * GROUP=: 分组变量
     * MARKERATTRS=: 标记属性
     * REG: 添加回归线
     * LOESS: 添加平滑曲线

3. COMPARE 语句：
   - 创建比较图
   - 选项：
     * GROUP=: 分组变量
     * LOESS: 添加平滑曲线
     * REG: 添加回归线
     * ELLIPSE: 添加置信椭圆

4. 常用图形选项：
   - 图形布局：
     * ROWS=: 行数
     * COLUMNS=: 列数
     * START=: 起始位置
   - 图形属性：
     * MARKERATTRS=: 标记属性
     * LINEATTRS=: 线条属性
     * TRANSPARENCY=: 透明度`,
        example: `/* 示例1：基本散点图矩阵 */
proc sgscatter data=clinical;
    matrix age weight height bmi / 
           diagonal=(histogram kernel)
           ellipse=(type=mean)
           group=treatment;
run;

/* 示例2：多变量相关性分析 */
proc sgscatter data=lab_data;
    plot (ldl hdl tg)*(weight bmi) /
         group=treatment
         reg=(nogroup)
         columns=2;
run;

/* 示例3：基线和终点的比较 */
proc sgscatter data=efficacy;
    compare y=endpoint x=baseline /
            group=treatment
            reg
            ellipse=(type=predicted);
run;`,
        category: "图形分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/grstatproc/p0f0fjp8g4o4p3n1rw6lf5t8z507.htm

相关主题：
1. 多变量分析
2. 相关性分析
3. 探索性数据分析
4. 临床试验数据可视化`
    },
    {
        name: "日期处理函数集",
        description: "临床试验中常用的日期处理函数，包括MDY、TODAY、INTCK、INTNX等，用于处理访视日期、随访时间等。",
        syntax: `/* 日期创建 */
MDY(month, day, year)
TODAY()
DATE()

/* 日期间隔计算 */
INTCK(interval, from, to)
INTNX(interval, start-date, increment)

/* 日期提取 */
YEAR(date)
MONTH(date)
DAY(date)`,
        details: `主要功能说明：

1. 日期创建函数：
   - MDY: 从月日年创建日期值
   - TODAY: 返回当前日期
   - DATE: 返回当前日期的SAS日期值

2. 日期间隔计算：
   - INTCK: 计算两日期之间的间隔数
     * 间隔类型：
       - 'YEAR': 年
       - 'MONTH': 月
       - 'QTR': 季度
       - 'WEEK': 周
       - 'DAY': 天
   
   - INTNX: 增加指定间隔的日期
     * 对齐选项：
       - 'BEGINNING'
       - 'MIDDLE'
       - 'END'
       - 'SAME'

3. 日期提取函数：
   - YEAR: 提取年份
   - MONTH: 提取月份
   - DAY: 提取日

4. 常用日期格式：
   - DATE9.
   - MMDDYY10.
   - YYMMDD10.
   - DATETIME.`,
        example: `/* 示例1：基本日期处理 */
data dates;
    /* 创建日期 */
    visit_date = mdy(3,15,2024);
    today = today();
    
    /* 计算间隔 */
    days = intck('day', visit_date, today);
    months = intck('month', visit_date, today);
    
    /* 日期提取 */
    visit_year = year(visit_date);
    visit_month = month(visit_date);
run;

/* 示例2：临床试验中的日期计算 */
data follow_up;
    set clinical;
    /* 计算随访时间 */
    follow_days = intck('day', start_date, end_date);
    
    /* 计算下次访视日期 */
    next_visit = intnx('month', last_visit, 3);
    
    /* 判断是否超出访视窗 */
    window_start = intnx('day', planned_visit, -3);
    window_end = intnx('day', planned_visit, 3);
    if actual_visit < window_start or 
       actual_visit > window_end then flag = 'Y';
run;

/* 示例3：生存时间计算 */
data survival;
    set study;
    /* 计算生存时间（月） */
    surv_months = intck('month', rand_date, death_date);
    
    /* 计算研究截止日期 */
    cutoff_date = mdy(12,31,2024);
    
    /* 计算审查时间 */
    censor_time = intck('day', rand_date, 
                       min(death_date, cutoff_date));
run;`,
        category: "日期函数",
        references: `参考资料：
1. SAS官方文档：
   - 日期函数：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/lefunctionsref/p0w6c8nf7qkh6mn1qwh5jc0o0r0g.htm
   - 日期式：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/leforinforref/n0yo2974m4yswan1lp0mn6bqsp8u.htm

相关主题：
1. 临床试验日期处理
2. 访视计算
3. 生存时间分析
4. 随访时间计算`
    },
    {
        name: "字符串处理函数集",
        description: "临床试验数据处理中常用的字符串处理函数，包括STRIP、COMPRESS、TRANWRD、SCAN等，用于数据清理和转换。",
        syntax: `/* 字符串清理 */
STRIP(string)
COMPRESS(string <,characters>)
TRIM(string)

/* 字符串搜索和替换 */
TRANWRD(string, target, replacement)
FIND(string, substring <,modifiers>)
INDEX(string, substring)

/* 字符串提取 */
SCAN(string, n <,delimiters>)
SUBSTR(string, position <,length>)

/* 字符串转换 */
UPCASE(string)
LOWCASE(string)
PROPCASE(string)`,
        details: `主要功能说：

1. 字符串清理函数：
   - STRIP: 删除首尾空格
   - COMPRESS: 删除指定字符
   - TRIM: 删除尾部空格
   
2. 搜索和替换：
   - TRANWRD: 替换指定词
   - FIND: 查找子串位置（支持修饰符）
   - INDEX: 查找子串位置

3. 字符串提取：
   - SCAN: 提取第n个词
   - SUBSTR: 提取子串
   
4. 大小写转换：
   - UPCASE: 转换为大写
   - LOWCASE: 转换为小写
   - PROPCASE: 首字母大写

5. 常用场景：
   - 数据标准化
   - 文本清理
   - 编码转换
   - 变量名处理`,
        example: `/* 示例1：基本字符串清理 */
data clean;
    text = "  SAS Programming  ";
    clean_text = strip(text);         /* 删除首尾空格 */
    upper_text = upcase(clean_text);  /* 转换为大写 */
    comp_text = compress(text, " ");  /* 删除所有空格 */
run;

/* 示例2：不良事件术语标准化 */
data ae_clean;
    set adverse_events;
    /* 标准化不良事件术语 */
    ae_term = propcase(strip(ae_term));
    
    /* 替换常见缩写 */
    ae_term = tranwrd(ae_term, "HTN", "Hypertension");
    ae_term = tranwrd(ae_term, "HA", "Headache");
run;

/* 示例3：实验室数据处理 */
data lab_clean;
    set raw_lab;
    /* 提取单位 */
    unit_start = find(result, "(");
    if unit_start > 0 then do;
        value = input(substr(result, 1, unit_start-1), best.);
        unit = substr(result, unit_start+1, length(result)-unit_start-1);
    end;
run;`,
        category: "字符串函数",
        references: `参考资料：
1. SAS官方文档：
   - 字符串函数：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/lefunctionsref/p0w6c8nf7qkh6mn1qwh5jc0o0r0g.htm
   - 字符串操作：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/leforinforref/n0yo2974m4yswan1lp0mn6bqsp8u.htm

相关主题：
1. 数据清理
2. 文本标准化
3. CDISC标准
4. 临床数据处理`
    },
    {
        name: "PROC SORT",
        description: "用于数据集排序，在临床试验数据处理中常用于按照受试者、访视、时间等变量对数据进行排。",
        syntax: `PROC SORT DATA=dataset <OUT=output-dataset> <NODUPKEY> <DUPOUT=duplicate-dataset>;
    BY <DESCENDING> variables;
    WHERE expression;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - DATA=: 输入数据集
   - OUT=: 输出数据集
   - NODUPKEY: 删除重复记录
   - DUPOUT=: 输出重复记录
   - NODUPRECS: 删除完全重复的观测

2. BY 语句选项：
   - DESCENDING: 降序排序
   - 多个变量排序
   - 混合升降序

3. 排序规则：
   - 字符变量：
     * 大小写敏感
     * 空格处理
     * 特殊字符处理
   
   - 数值变量：
     * 缺失值处理
     * 数值精度

4. 常用场景：
   - 数据合并前排序
   - 重复记录处理
   - BY组处理准备
   - 时间序列排序`,
        example: `/* 示例1：基本排序 */
proc sort data=clinical out=clinical_sorted;
    by subject visit;
run;

/* 示例2：删除重复记录 */
proc sort data=adverse_events nodupkey dupout=duplicates;
    by usubjid ae_term ae_start_dt;
run;

/* 示例3：混合升降序 */
proc sort data=lab_data;
    by subject descending visit parameter;
run;

/* 示例4：条件排序 */
proc sort data=efficacy;
    where safety_pop='Y';
    by treatment descending response;
run;`,
        category: "数据处理",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/proc/p18mw2ey4ob1r1n1qzjjjk0x865a.htm

相关主题：
1. 数据管理
2. 重复记录处理
3. 数据合并准备
4. 临床试验数据处理`
    },
    {
        name: "PROC TRANSPOSE",
        description: "用于数据集的转置操作，在临床试验数据处理中常用于长宽格式转换、多重响应数据处理等。",
        syntax: `PROC TRANSPOSE DATA=dataset OUT=output-dataset <PREFIX=prefix> <NAME=name>;
    BY variables;
    ID variable;
    VAR variables;
    IDLABEL variable;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - DATA=: 输入数据集
   - OUT=: 输出数据集
   - PREFIX=: 新变量前缀
   - NAME=: 存储原变量名的变量
   - LABEL=: 存储原变量标签的变量

2. 主要语句：
   - BY: 指定分组变量
   - ID: 指定新变量名的来源
   - VAR: 指定要转置的变量
   - IDLABEL: 指定新变量标签的来源

3. 常用场景：
   - 长转宽格式：
     * 重复测量数据
     * 实验室检查数据
     * 生命体征数据
   
   - 宽转长格式：
     * SDTM/ADaM转换
     * 多重响应分析
     * 时间序列分析

4. 注意事项：
   - 数据排序
   - 缺失值处理
   - 变量命名规则
   - BY变量处理`,
        example: `/* 示例1：基本长转宽转换 */
proc transpose data=vitals out=vitals_wide prefix=visit_;
    by subject parameter;
    id visit;
    var value;
run;

/* 示例2：多变量同时转置 */
proc transpose data=lab_data out=lab_wide(drop=_name_);
    by subject;
    id parameter;
    var result;
run;

/* 示例3：宽转长格式 */
proc transpose data=efficacy_wide 
               out=efficacy_long(rename=(col1=value _name_=visit));
    by subject treatment;
    var visit_:;
run;

/* 示例4：复杂转置示例 */
proc transpose data=ae_data out=ae_summary prefix=n_;
    by usubjid;
    id aebodsys aedecod;  /* 双重ID */
    var count;
run;`,
        category: "数据处理",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/proc/p1r2rh4xj3hw2yn1b4o0z8v9ynxt.htm

相关主题：
1. 数据重构
2. CDISC标准转换
3. 临床试验数据管理
4. 统计分析数据准备`
    },
    {
        name: "基本数学函数集",
        description: "临床试验数据分析中常用的基本数学函数，包括MEAN、MEDIAN、STD、VAR、MIN/MAX、ROUND、LOG/EXP、SQRT等。",
        syntax: `/* 统计函数 */
MEAN(arg1, arg2, ..., argn)
MEDIAN(arg1, arg2, ..., argn)
STD(arg1, arg2, ..., argn)
VAR(arg1, arg2, ..., argn)
MIN(arg1, arg2, ..., argn)
MAX(arg1, arg2, ..., argn)

/* 数学函数 */
ROUND(number <,round-off-unit>)
LOG(number)
EXP(number)
SQRT(number)`,
        details: `主要功能说明：

1. 统计函数：
   - MEAN: 计算算术平均值
   - MEDIAN: 计算中位数
   - STD: ���算标准差
   - VAR: 计算方差
   - MIN/MAX: 计算最小值/最大值

2. 数学函数：
   - ROUND: 四舍五入
     * 可指定小数位数
     * 可指定取整单位
   - LOG: 自然对数
   - EXP: e的指数
   - SQRT: 平方根

3. 使用注意：
   - 缺失值处理：
     * 统计函数忽略缺失值
     * 数学函数返回缺失值
   - 精度考
     * 四舍五入精度
     * 计算误差处理
   
4. 常用场景：
   - 描述性统计
   - 数据标准化
   - 变量转换
   - 计算派生变量`,
        example: `/* 示例1：基本统计计算 */
data stats;
    x1 = 10; x2 = 20; x3 = 30;
    mean_val = mean(x1, x2, x3);    /* 计算平均值 */
    std_val = std(x1, x2, x3);      /* 计算标准差 */
    med_val = median(x1, x2, x3);   /* 计算中位数 */
run;

/* 示例2：数据标准化 */
data normalized;
    set raw_data;
    array vars[*] var1-var5;
    array std_vars[5];
    
    do i = 1 to dim(vars);
        std_vars[i] = (vars[i] - mean(of vars[*])) / std(of vars[*]);
    end;
run;

/* 示例3：实验室数据处理 */
data lab_processed;
    set lab_data;
    /* 对数转换 */
    if result > 0 then log_result = log(result);
    
    /* 四舍五入到指定小数位 */
    rounded_result = round(result, 0.1);
    
    /* 计算变化率 */
    if baseline > 0 then 
        pct_change = round(100 * (result - baseline) / baseline, 0.1);
run;

/* 示例4：汇总统计 */
proc means data=clinical noprint;
    var response;
    output out=stats 
           mean=mean_resp 
           std=std_resp
           min=min_resp
           max=max_resp
           median=med_resp;
run;`,
        category: "数学函数",
        references: `参考资料：
1. SAS官方文档：
   - 数学函数：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/lefunctionsref/p0wt6z0mhvzmgrn1qzwx52t3qm1k.htm
   - 统计函数：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/lefunctionsref/p0wt6z0mhvzmgrn1qzwx52t3qm1k.htm

相关主题：
1. 描述性统计
2. 数据转换
3. 标准化方法
4. 临床数据处理`
    },
    {
        name: "PROC SEQDESIGN",
        description: "用于设计群序分析（序贯设计）临床试验，可以控制总体I类错误率，同时允许在试验过程中进行中期分析。",
        syntax: `PROC SEQDESIGN < options > ;
    DESIGN < options > ;
    SAMPLESIZE < MODEL= option > ;
RUN;`,
        details: `主要参数说明：

1. 基本设计选项：
   - NSTAGES=: 阶段数
   - ALT=: 备择假设类型
     * TWOSIDED: 双侧
     * UPPER: 单侧上界
     * LOWER: 单侧下界
   - ALPHA=: 显著性水平
   - BETA=: II类错误率
   - METHOD=: 边界方法
     * OBF: O'Brien-Fleming
     * POCOCK: Pocock
     * WHITEHEAD: Whitehead
     * ERROR: Error spending

2. 样本量计算：
   - MODEL=: 分析模型
     * TWOSAMPLEFREQ: 双样本比例
     * TWOSAMPLEMEAN: 双样本均值
     * TWOSAMPLESURVIVAL: 生存分析
   - ARMS=: 分组数
   - ACCRUAL=: 入组方式
   - LOSS=: 脱落率

3. 输出内容：
   - 边界值
   - 样本量
   - 检验效能
   - 停止概率
   - 期望样本量

4. 特殊考虑：
   - 不同阶段的权重
   - 不平衡设计
   - 条件检验效能
   - 期望试验持续时间`,
        example: `/* 示例1：基本序贯设计 */
proc seqdesign altref=0.25
              plots=boundary(hscale=samplesize)
              ;
    TwoSidedOBrienFleming: design nstages=4
                                  method=obf
                                  alt=twosided
                                  stop=both
                                  alpha=0.05
                                  beta=0.1
                                  ;
    samplesize model=twosamplemean(stddev=0.5 weight=2);
run;

/* 示例2：生存分析的序贯设计 */
proc seqdesign altref=0.5
              plots=(boundary power)
              ;
    design nstages=3
           method=errfuncpow
           alt=upper
           stop=both
           alpha=0.025
           beta=0.1
           ;
    samplesize model=twosamplesurvival
               ( hazard=0.7
                 accrate=10
                 loss=exp(0.05)
                 acctime=20
                 foltime=10
                 totaltime=30
               );
run;

/* 示例3：带有futility边界的设计 */
proc seqdesign altref=0.15
              plots=boundary
              ;
    design nstages=3
           method(alpha)=obf
           method(beta)=pow
           alt=upper
           stop=both
           alpha=0.025
           beta=0.1
           ;
    samplesize model=twosamplefreq(nullprop=0.3);
run;`,
        category: "临床试验设计",
        references: `参考资料：
1. SAS官方文档：
   - SEQDESIGN: https://documentation.sas.com/doc/en/statug/15.2/statug_seqdesign_syntax.htm
   - 序贯分析：https://documentation.sas.com/doc/en/statug/15.2/statug_introseq_toc.htm

2. 相关指南：
   - FDA Guidance: Adaptive Designs for Clinical Trials of Drugs and Biologics
   - EMA Reflection Paper on Methodological Issues in Confirmatory Clinical Trials with Flexible Design and Analysis Plan

相关主题：
1. 群序分析
2. 临床试验设计
3. 中期分析
4. 样本量计算`
    },
    {
        name: "PROC SEQTEST",
        description: "用于执行群序分析（序贯分析）的中期和最终分析，配合PROC SEQDESIGN使用。在临床试验中用于进行计划的中期分析和最终分析。",
        syntax: `PROC SEQTEST < options >
    BOUNDARY=SAS-data-set
    < PARMS( parameter-name = value ... ) = SAS-data-set >
    < CITYPE= LOWER | UPPER | TWOSIDED >
    < ORDER= LR | MLE | STAGEWISE >
    ;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - BOUNDARY=: 指定包含边信息的数据集（由SEQDESIGN生成）
   - PARMS=: 指定包含参数估计的数据集
   - DATA=: 指定包含分析数据的数据集
   - ORDER=: 指定排序方法
     * LR: 似然比统计量
     * MLE: 最大似然估计
     * STAGEWISE: 分阶段

2. 分选项：
   - BOUNDARYKEY=: 边界关键值
     * ALPHA: 显著性水平
     * BETA: II类错误
     * BOTH: 两者都用
   - BETAOVERLAP=: Beta重叠检查
   - ERRSPEND: 误差支出分析
   - NSTAGES=: 总阶段数
   - STOP=: 停止准则
     * ACCEPT: 接受H0
     * REJECT: 拒绝H0
     * BOTH: 两者都考虑

3. 输出选项：
   - PLOTS=: 控制图形输出
     * BOUNDARY: 边界图
     * ERROR: 误差支出图
     * POWER: 检验效能图
   - TEST=: 检验类型
     * MEAN: 均值
     * PROP: 比例
     * HAZARD: 风险比

4. 结果解释：
   - 检验统计量
   - 调整后p值
   - 置信区间
   - 条件功效
   - 停止概率`,
        example: `/* 示例1：基本序贯分析 */
/* 第1步：设计 */
proc seqdesign altref=0.25 plots=boundary(hscale=samplesize)
              outdesign=Bnd_Mean;
    TwoSidedOBrienFleming: design nstages=4 method=obf
                                  alt=twosided
                                  stop=both
                                  alpha=0.05 beta=0.1;
run;

/* 第2步：第一次中期分析 */
proc seqtest Boundary=Bnd_Mean
             data=Data_Diff
             parms(Diff=0.28)
             infvar=variance
             boundarykey=alpha
             plots=test
             ;
    ods output test=Test_Diff1;
run;

/* 示例2：生存分析的序贯分析 */
/* 第1步：设计 */
proc seqdesign altref=0.5 plots=(boundary power)
              outdesign=Bnd_Surv;
    design nstages=3 method=errfuncpow
           alt=upper stop=both
           alpha=0.025 beta=0.1;
run;

/* 第2步：中期分析 */
proc seqtest Boundary=Bnd_Surv
             data=Surv_Data
             parms(Hazard=-0.5)
             order=lr
             ;
    time weeks*censor(0);
    test hazard;
run;`,
        category: "临床试验设计",
        references: `参考资料：
1. SAS官方文档：
   - SEQTEST: https://documentation.sas.com/doc/en/statug/15.2/statug_seqtest_syntax.htm
   - 序贯分析：https://documentation.sas.com/doc/en/statug/15.2/statug_introseq_toc.htm

2. 相关指南：
   - FDA Guidance: Adaptive Designs for Clinical Trials of Drugs and Biologics
   - EMA Reflection Paper on Methodological Issues in Confirmatory Clinical Trials with Flexible Design and Analysis Plan

相关主题：
1. 群序分析
2. 中期分析
3. 临床试验监测
4. 边界调整`
    },
    {
        name: "PROC NLIN",
        description: "用于非线性回归分析，在临床试验中常用于药代动力学参数估计、剂量反应关系分析等。",
        syntax: `PROC NLIN DATA=dataset <options>;
    PARMS parameter-specification;
    MODEL dependent = expression;
    BOUNDS boundary-constraints;
    OUTPUT OUT=dataset PREDICTED=name RESIDUAL=name;
    ID variables;
RUN;`,
        details: `主要参数说明：

1. 基本语句：
   - PARMS: 指定参数初值
   - MODEL: 定义非线性模型
   - BOUNDS: 参数约束条件
   - OUTPUT: 输出预测值和残差

2. 估计方法选项：
   - METHOD=:
     * GAUSS: Gauss-Newton法
     * MARQUARDT: Levenberg-Marquardt法
     * GRADIENT: 梯度法
     * NEWTON: Newton法

3. 迭代控制：
   - MAXITER=: 最大迭代次数
   - CONVERGE=: 收准则
   - SINGULAR=: 奇异值标准
   - SIGSQ=: 误差方差估计方法

4. 常用药动学模型：
   - 一室模型
   - 二室模型
   - 吸收-消除模型
   - Emax模型
   - Hill方程`,
        example: `/* 示例1：一室模型拟合 */
proc nlin data=pk_data method=marquardt;
    parms ke=0.1 v=10;
    model conc = dose/v * exp(-ke*time);
    output out=pred p=pred r=resid;
run;

/* 示例2：Emax模型拟合 */
proc nlin data=dose_response;
    parms e0=0 emax=100 ed50=50;
    bounds 0 <= ed50;
    model effect = e0 + (emax*dose)/(ed50 + dose);
    output out=results p=predicted r=residual;
run;

/* 示例3：带权重的非线性回归 */
proc nlin data=weighted_data method=marquardt;
    parms a=1 b=0.5 c=1;
    _weight_ = 1/variance;
    model response = a/(1 + b*exp(-c*time));
    output out=pred p=pred r=resid;
run;`,
        category: "非线性回归",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_nlin_syntax.htm

相关主题：
1. 药代动力学分析
2. 剂量反应关系
3. 非线性模型拟合
4. 参数估计`
    },
    {
        name: "PROC MODEL",
        description: "用于拟合非线性模型系统，在临床试验中常用于复杂的药代动力学/药效学模型拟合、联立方程模型等。",
        syntax: `PROC MODEL DATA=dataset <options>;
    VAR variables;
    PARMS parameters </ options>;
    BOUNDS bound-specifications;
    RESTRICT restriction-expressions;
    FIT dependent = expressions </ options>;
    ID variables;
    OUTPUT OUT=dataset <options>;
RUN;`,
        details: `主要参数说明：

1. 基本语句：
   - VAR: 声明模型中使用的变量
   - PARMS: 指定参数及其初值
   - BOUNDS: 参数约束条件
   - RESTRICT: 参数间的约束关系
   - FIT: 定义模型方程

2. 估计方法选项：
   - METHOD=:
     * GAUSS: Gauss-Newton法
     * MARQUARDT: Levenberg-Marquardt法
     * NEWTON: Newton-Raphson法
     * LIML: 有限信息最大似然
     * FIML: 完全信息最大似然

3. 优化控制：
   - MAXITER=: 最大迭代次数
   - CONVERGE=: 收敛准则
   - SINGULAR=: 奇异值标准
   - STARTITER: 起始迭代值

4. 常用应用场景：
   - PK/PD建模
   - 联立方程系统
   - 动态系统建模
   - 非线性回归`,
        example: `/* 示例1：基本PK模型拟合 */
proc model data=pk_data;
    parms ka=0.5 ke=0.1 v=10;
    bounds 0 < ka, 0 < ke, 0 < v;
    dconc_dt = ka*dose - ke*conc;
    fit conc = v*dconc_dt;
    output out=results p=pred r=resid;
run;

/* 示例2：双室模型拟合 */
proc model data=two_comp;
    parms k12=0.1 k21=0.05 ke=0.2 v1=10;
    bounds 0 < k12, 0 < k21, 0 < ke, 0 < v1;
    
    /* 定义微分方程 */
    dc1_dt = -k12*c1 + k21*c2 - ke*c1;
    dc2_dt = k12*c1 - k21*c2;
    
    fit conc = v1*c1;
    output out=results p=pred r=resid;
run;

/* 示例3：PK/PD模型拟合 */
proc model data=pkpd;
    /* PK参数 */
    parms ka=0.5 ke=0.1 v=10;
    /* PD参数 */
    parms emax=100 ec50=5 gamma=1;
    
    /* PK模型 */
    dconc_dt = ka*dose - ke*conc;
    
    /* PD模型（Sigmoid Emax） */
    effect = emax * (conc**gamma)/(ec50**gamma + conc**gamma);
    
    fit conc = v*dconc_dt 
        effect = effect;
    output out=results p=pred r=resid;
run;`,
        category: "非线性模型",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/etsug/15.2/etsug_model_syntax.htm

相关主题：
1. 药代动力学建模
2. 药效学建模
3. 非线性模型拟合
4. 动态系统建模`
    },
    {
        name: "PROC QUANTREG",
        description: "用于分位数回归分析，在临床试验中常用于评估协变量对响应变量不同分位数的影响，特别适用于数据分布不对称或存在异常值的情况。",
        syntax: `PROC QUANTREG DATA=dataset <options>;
    CLASS variables;
    MODEL response = predictors </options>;
    TEST effects;
    OUTPUT OUT=dataset <options>;
    WEIGHT variable;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - DATA=: 输入数据集
   - ALGORITHM=: 计算方法
     * SIMPLEX: 单纯形算法
     * INTERIOR: 内点算法
     * SMOOTH: 平滑算法
   - CI=: 置信区间方法
     * NONE
     * RANK
     * SPARSITY
     * RESAMPLING

2. MODEL语句选项：
   - QUANTILE=: 指定分位数
   - SEED=: 随机数种子
   - DIAGNOSTICS: 诊断统计量
   - CUTOFF=: 异常值界值
   - LEVERAGE: 杠杆值分析

3. 输出选项：
   - PREDICTED=: 预测值
   - RESIDUAL=: 残差
   - LEVERAGE=: 杠杆值
   - OUTLIER=: 异常值标识
   - MAHADIST=: 马氏距离

4. 诊断和图形：
   - 残差分析
   - 影响分析
   - 拟合诊断
   - QQ图
   - 残差图`,
        example: `/* 示例1：基本分位数回归 */
proc quantreg data=clinical ci=resampling;
    class treatment;
    model response = treatment age weight / quantile=0.5;
    output out=out_median predicted=pred residual=resid;
run;

/* 示例2：多个分位数的分析 */
proc quantreg data=lab_data;
    model result = baseline age gender / 
          quantile=0.25 0.5 0.75
          plot=quantplot;
    test gender;
run;

/* 示例3：带诊断的完整分析 */
proc quantreg data=efficacy algorithm=interior(tolerance=1e-4);
    class treatment center;
    model change = treatment baseline center age / 
          quantile=(0.1 0.25 0.5 0.75 0.9)
          diagnostics leverage;
    output out=out_all predicted=p residual=r 
           leverage=l mahadist=m outlier=o;
    test treatment;
run;`,
        category: "高级统计过程",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_quantreg_syntax.htm

相关主题：
1. 分位数回归
2. 稳健回归
3. 异常值分析
4. 临床试验数据分析`
    },
    {
        name: "PROC ROBUSTREG",
        description: "用于稳健回归分析，在临床试验中用于处理含有异常值或不满足正态性假设的数据。提供多种稳健估计方法。",
        syntax: `PROC ROBUSTREG DATA=dataset <options>;
    MODEL response = predictors </options>;
    CLASS variables;
    WEIGHT variable;
    TEST effects;
    OUTPUT OUT=dataset <options>;
RUN;`,
        details: `主要参数说明：

1. 估计方法选项：
   - METHOD=:
     * M: M估计（默认）
     * LTS: 最小截断平方
     * S: S估计
     * MM: MM估计
   - OPTION选项：
     * CONVERGENCE=
     * MAXITER=
     * SCALE=
     * INITH=: 初始H值

2. MODEL语句选项：
   - DIAGNOSTICS: 诊断统计量
   - LEVERAGE: 杠杆值分析
   - NOGOODFIT: 抑制拟合优度
   - CUTOFF=: 异常值界值
   - ITPRINT: 打印迭代历史

3. OUTPUT选项：
   - OUTLIER=: 异常值标识
   - LEVERAGE=: 杠杆值
   - RESIDUAL=: 残差
   - PREDICTED=: 预测值
   - STDP=: 预测标准误
   - MAHADIST=: 马氏距离

4. 诊断统计量：
   - 残差分析
   - 影响分析
   - 异常值检测
   - 杠杆点识别`,
        example: `/* 例1：基本M估计 */
proc robustreg data=clinical method=m;
    model response = treatment age weight / diagnostics;
    output out=out1 outlier=outlier 
           residual=resid predicted=pred;
run;

/* 示例2：使用LTS方法 */
proc robustreg data=lab_data method=lts;
    class treatment;
    model change = treatment baseline / 
          leverage(mcdinfo) diagnostics;
    output out=out2 leverage=lev 
           residual=res outlier=out;
run;

/* 示例3：完整的稳健分析 */
proc robustreg data=efficacy method=mm seed=100;
    class treatment center;
    model response = treatment baseline age center /
          diagnostics leverage;
    weight wgt;
    test treatment;
    output out=robout predicted=p 
           residual=r outlier=o 
           leverage=l mahadist=md;
run;`,
        category: "高统计过程",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_robustreg_syntax.htm

相关主题：
1. 稳健回归
2. 异常值处理
3. 诊断分析
4. 临床试验数据分析`
    },
    {
        name: "PROC TABULATE",
        description: "用于创建交叉表格式的汇总报表，在临床试验中常用于人口统计学特征、基线特征和安全性数据的汇总分析。",
        syntax: `PROC TABULATE DATA=dataset <options>;
    CLASS variables;
    VAR variables;
    TABLE page-expression, row-expression, column-expression;
    KEYLABEL keyword-list / options;
    KEYWORD keyword-list / options;
    FORMAT variables format;
RUN;`,
        details: `主要参数说明：

1. 基本语句：
   - CLASS: 指定分类变量
   - VAR: 指定分析变量
   - TABLE: 定义表格结构
   - FORMAT: 指定显示格式

2. TABLE语句语法：
   - 维度分隔符：
     * , (逗号): 分隔页、行、列
     * * (星号): 嵌套关系
     * | (竖线): 并列关系
   
   - 统计量关键字：
     * N: 频数
     * PCTN: 百比
     * MEAN: 均值
     * STD: 标准差
     * MEDIAN: 中位数
     * MIN/MAX: 最小/最大值

3. 格式控制：
   - 显示格式：
     * 数值格式
     * 百分比格式
     * 自定义格式
   - 单元格样式：
     * 对齐方式
     * 缩进
     * 空格处理

4. 常用选项：
   - MISSING: 处理缺失值
   - NOSEPS: 删除分隔线
   - BOX: 添加边框
   - INDENT=: 缩进空格数`,
        example: `/* 示例1：基本人口统计学特征表 */
proc tabulate data=demographics;
    class treatment sex age_group;
    var age weight height;
    table treatment * (sex age_group all),
          (age weight height) * 
          (n mean std median min max) * f=8.1;
run;

/* 示例2：不良事件汇总表 */
proc tabulate data=adverse_events;
    class treatment aebodsys aedecod;
    table aebodsys * aedecod,
          treatment * (n pctn<treatment>);
    keylabel n='N' pctn='%';
run;

/* 示例3：实验室检查结果表 */
proc tabulate data=lab_data;
    class treatment visit parameter;
    var result chg;
    table parameter * visit,
          treatment * (result * (n mean std) 
                      chg * (mean std)) * f=8.2;
    where safety_pop='Y';
run;`,
        category: "描述性统计",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.3/proc/p1h3o8nfahsg7dn1q0vy6y3c7gui.htm

相关主题：
1. 交叉表分析
2. 描述性统计
3. 临床试验报表
4. 数据汇总`
    },
    {
        name: "PROC ICLIFETEST",
        description: "用于区间删失数据的非参数生存分析，在临床试验中用于处理不能精确观察到事件发生时间的情况。",
        syntax: `PROC ICLIFETEST DATA=dataset <options>;
    TIME (left, right);
    STRATA variables;
    TEST variables;
    FREQ variable;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - DATA=: 输入数据集
   - METHOD=: 估计方法
     * TURNBULL: Turnbull算法（默认）
     * ICM: 迭代凸最小化
   - MAXITER=: 最大迭代次数
   - ALPHA=: 显著性水平

2. TIME语句：
   - left: 区间左端点
   - right: 区间右端点
   特殊情况：
   - (.,t]: 左删失
   - [t,.): 右删失
   - [t]: 精确观测

3. 检验选项：
   - TEST=: 组间比较方法
     * LOGRANK: Log-rank检验
     * WILCOXON: Wilcoxon检验
   - TREND: 趋势检验
   - DIFF=: 差异类型

4. 输出选项：
   - PLOTS=: 图形输出
     * SURVIVAL: 生存曲线
     * HAZARD: 风险函数
     * CIF: 累积发生率
   - OUTSURV=: 输出生存估计
   - MAXTIME=: 最大观察时间`,
        example: `/* 示例1：基本区间删失分析 */
proc iclifetest data=interval_data;
    time (ltime, rtime);
    strata treatment;
    freq count;
run;

/* 示例2：多组比较 */
proc iclifetest data=clinical plots=survival(cl);
    time (last_neg, first_pos);
    strata treatment / test=all;
    freq count;
run;

/* 示例3：带协变量的分析 */
proc iclifetest data=study plots=(survival hazard);
    time (left, right);
    strata gender age_group;
    test treatment;
run;`,
        category: "生存分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_iclifetest_syntax.htm

相关主题：
1. 区间删失数据分析
2. 生存分析
3. 非参数方法
4. 临床试验数据分析`
    },
    {
        name: "PROC ICPHREG",
        description: "用于区间删失数据的比例风险回归分析，是PROC PHREG的扩展版本，适用于事件发生时间只知道发生在某个时间区间内的情况。",
        syntax: `PROC ICPHREG DATA=dataset <options>;
    CLASS variables </options>;
    MODEL (left, right) = covariates </options>;
    BASELINE OUT=dataset COVARIATES=dataset </options>;
    HAZARDRATIO variable </options>;
RUN;`,
        details: `主要参数说明：

1. 基本选项：
   - DATA=: 输入数据集
   - BASELINE=: 基线风险函数估计
   - METHOD=: 估计方法
     * ICM: 迭代凸最小化（默认）
     * TURNBULL: Turnbull算法
   - NLOPTIONS: 非线性优化选项

2. MODEL语句：
   - (left, right): 区间端点
   - 特殊情况：
     * (., right]: 左删失
     * [left, .): 右删失
     * [time]: 精确观测
   - 选项：
     * OFFSET=: 偏移变量
     * TIES=: 同时事件处理方法

3. 诊断选项：
   - INFLUENCE: 影响诊断
   - RESIDUAL: 残差分析
   - DFBETA: 参数变化诊断
   - LEVERAGE: 杠杆值分析

4. 输出选项：
   - ALPHA=: 置信水平
   - CL=: 置信区间类型
   - RISKLIMITS: 风险比估计
   - PLOTS=: 图形输出`,
        example: `/* 示例1：基本区间删失回归 */
proc icphreg data=interval;
    class treatment (ref='0');
    model (ltime, rtime) = treatment age gender;
    hazardratio treatment;
run;

/* 示例2：带基线风险函数估计 */
proc icphreg data=clinical;
    class trt (ref='placebo');
    model (start, stop) = trt age weight;
    baseline out=base covariates=covs survival=surv;
run;

/* 示例3：完整分析示例 */
proc icphreg data=study plots(overlay)=survival;
    class treatment center;
    model (left, right) = treatment age center / risklimits;
    baseline out=surv_est covariates=newdata;
    hazardratio 'Treatment Effect' treatment;
    output out=out_data resmart=resid xbeta=lin_pred;
run;`,
        category: "生存分析",
        references: `参考资料：
1. SAS官方文档：https://documentation.sas.com/doc/en/statug/15.2/statug_icphreg_syntax.htm

相关主题：
1. 区间删失数据分析
2. 比例风险模型
3. 生存分析
4. 临床试验数据分析`
    }
    // ... 继续添加其他函数
]; 