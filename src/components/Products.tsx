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
  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: "Пример товара", description: "Это пример описания", price: "5000" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    title: "",
    description: "",
    price: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addProduct = () => {
    if (newProduct.title && newProduct.description && newProduct.price) {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts([...products, { ...newProduct, id: newId }]);
      setNewProduct({ title: "", description: "", price: "" });
      setIsModalOpen(false);
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
        
        {/* Кнопка добавления нового товара */}
        <div className="mt-4">
          <Button 
            color="primary" 
            size="large" 
            title="Добавить товар" 
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {/* Модалка */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Добавить новый товар</h2>
              
              <div className="mb-4">
                <label className="block mb-2">Название</label>
                <Input
                  type="text"
                  name="title"
                  value={newProduct.title}
                  onChange={handleInputChange}
                  placeholder="Введите название"
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
                  placeholder="Введите описание"
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
                  placeholder="Введите цену"
                  color="primary"
                  size="medium"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  color="secondary" 
                  size="medium" 
                  title="Отмена" 
                  onClick={() => setIsModalOpen(false)}
                />
                <Button 
                  color="primary" 
                  size="medium" 
                  title="Добавить" 
                  onClick={addProduct}
                />
              </div>
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
                <div key={product.id} className="relative">
                    <ProductCard key={product.id} product={product} />
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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">{product.title}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-amber-700 font-bold">{product.price} ₽</p>
    </div>
  );
};