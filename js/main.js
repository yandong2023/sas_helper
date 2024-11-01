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
            card.innerHTML = `
                <div class="function-name">${func.name}</div>
                <div class="function-desc">${func.description}</div>
                <div class="function-syntax">${func.syntax}</div>
                <div class="function-example">${func.example}</div>
                <div class="function-category">类别: ${func.category}</div>
            `;
            functionList.appendChild(card);
        });
    }
}); 