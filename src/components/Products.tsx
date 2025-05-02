import React, { useState, useEffect } from "react";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Text } from "../components/Text";

type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
};

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    title: "",
    description: "",
    price: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) throw new Error('Ошибка сохранения');

      const savedProduct = await response.json();
      setProducts([...products, savedProduct]);
      setNewProduct({ title: "", description: "", price: "" });
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Container>
      <div className="p-6">
        <Text color="primary" size="large">
          Управление товарами
        </Text>

        <Button 
          color="primary" 
          size="large" 
          title="Добавить товар" 
          onClick={() => setIsModalOpen(true)}
        />

        {error && <div className="text-red-500 mt-2">{error}</div>}

        {/* Модальное окно добавления товара */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Новый товар</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Название</label>
                  <Input
                    type="text"
                    name="title"
                    value={newProduct.title}
                    onChange={handleInputChange}
                    required
                    color="primary"
                    size="medium"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Описание</label>
                  <Input
                    type="text"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                    color="primary"
                    size="medium"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Цена</label>
                  <Input
                    type="text"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                    color="primary"
                    size="medium"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button"
                    color="secondary" 
                    size="medium" 
                    title="Отмена" 
                    onClick={() => setIsModalOpen(false)}
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit"
                    color="primary" 
                    size="medium" 
                    title={isLoading ? "Сохранение..." : "Сохранить"} 
                    disabled={isLoading}
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Список товаров */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Список товаров</h2>
          {products.length === 0 ? (
            <Text color="secondary" size="medium">Товаров пока нет</Text>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id} className="relative group bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <p className="text-amber-700 font-bold mt-2">{product.price} ₽</p>
                  <Button
                    color="secondary"
                    size="small"
                    title="Удалить"
                    onClick={() => deleteProduct(product.id)}
                    className="absolute top-2 right-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};