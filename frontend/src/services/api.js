const API_BASE = '/api/v1';

export const api = {
  // Modelos de Encarte
  async getTemplates() {
    try {
      const res = await fetch(`${API_BASE}/templates/`);
      if (!res.ok) throw new Error('Falha ao obter modelos');
      return await res.json();
    } catch (e) {
      console.warn('Usando catálogo local de templates');
      return null;
    }
  },

  // Encartes Salvos
  async getFlyers() {
    const res = await fetch(`${API_BASE}/flyers/`);
    if (!res.ok) throw new Error('Erro ao listar encartes');
    return await res.json();
  },

  async getFlyerById(id) {
    const res = await fetch(`${API_BASE}/flyers/${id}`);
    if (!res.ok) throw new Error('Erro ao carregar encarte');
    return await res.json();
  },

  async saveFlyer(flyerData) {
    const method = flyerData.id ? 'PUT' : 'POST';
    const url = flyerData.id ? `${API_BASE}/flyers/${flyerData.id}` : `${API_BASE}/flyers/`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flyerData)
    });
    if (!res.ok) throw new Error('Erro ao salvar encarte');
    return await res.json();
  },

  async deleteFlyer(id) {
    const res = await fetch(`${API_BASE}/flyers/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  // Produtos Cadastrados
  async getProducts(query = '') {
    const url = query ? `${API_BASE}/products/?query=${encodeURIComponent(query)}` : `${API_BASE}/products/`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return await res.json();
  },

  async createProduct(productData) {
    const res = await fetch(`${API_BASE}/products/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return await res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  // Perfil do Mercado
  async getMarket() {
    try {
      const res = await fetch(`${API_BASE}/markets/current`);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async saveMarket(marketData) {
    const res = await fetch(`${API_BASE}/markets/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(marketData)
    });
    return await res.json();
  },

  // Upload de Imagens
  async uploadImage(file, folder = 'products') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const res = await fetch(`${API_BASE}/upload/`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Erro no upload da imagem');
    return await res.json();
  }
};

