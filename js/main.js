document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const functionList = document.getElementById('functionList');

    // 初始显示所有函数
    displayFunctions(sasFunctions);

    // 搜索和筛选功能
    function filterFunctions() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        
        const filteredFunctions = sasFunctions.filter(func => {
            const matchesSearch = func.name.toLowerCase().includes(searchTerm) ||
                                func.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || func.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        
        displayFunctions(filteredFunctions);
    }

    // 监听搜索和分类变化
    searchInput.addEventListener('input', filterFunctions);
    categorySelect.addEventListener('change', filterFunctions);

    // 显示函数列表
    function displayFunctions(functions) {
        functionList.innerHTML = '';
        functions.forEach(func => {
            const card = document.createElement('div');
            card.className = 'function-card';
            
            // 基本信息
            let html = `
                <div class="function-name">${func.name}</div>
                <div class="function-desc">${func.description}</div>
                <div class="function-category">类别: ${func.category}</div>
            `;
            
            // 语法部分（使用pre标签保持格式）
            html += `
                <div class="section-title">语法:</div>
                <pre class="function-syntax">${func.syntax}</pre>
            `;
            
            // 示例部分
            html += `
                <div class="section-title">示例:</div>
                <pre class="function-example">${func.example}</pre>
            `;
            
            // 详细信息（如果有）
            if (func.details) {
                html += `
                    <div class="section-title">详细说明:</div>
                    <pre class="function-details">${func.details}</pre>
                `;
            }
            
            // 参考文献（如果有）
            if (func.references) {
                html += `
                    <div class="section-title">参考资料:</div>
                    <div class="function-references">${func.references}</div>
                `;
            }
            
            card.innerHTML = html;
            functionList.appendChild(card);
        });
    }
}); 