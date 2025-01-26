import React, { useState, useEffect } from "react";
import Menu from "@/Components/MenuComponent/MenuComponent";
import { useRouter } from "next/router";
import './styles/admin-cabinet.css';
import FooterComponent from "@/Components/FooterComponent/FooterComponent";

const statusMap: { [key: string]: string } = {
    'в обробці': 'IN_PROGRESS',
    'в процесі написання': 'IN_WRITING',
    'готове': 'READY',
};

const paymentStatusMap: { [key: string]: string } = {
    'не оплачено': 'NOT_PAID',
    'є пeредоплата': 'PARTIAL_PAYMENT',
    'оплачено': 'PAID',
};

const AdminCabinet = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]); // Для фільтрації
    const [topicFilter, setTopicFilter] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
    const [updatedStatus, setUpdatedStatus] = useState<string>("");
    const [updatedPaymentStatus, setUpdatedPaymentStatus] = useState<string>("");
    const [updatedCost, setUpdatedCost] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/sigh-in");
                return;
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Помилка завантаження даних.");
                return;
            }
            const result = await response.json();
            setOrders(result || []);
            setFilteredOrders(result || []); // Збережемо всі замовлення для фільтрації
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage("Сталася помилка. Спробуйте пізніше.");
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        router.push('/main');
    };

    const logUserInput = () => {
        console.log("Оновлений статус: ", updatedStatus);
        console.log("Оновлений статус оплати: ", updatedPaymentStatus);
        console.log("Оновлена ціна: ", updatedCost);
        console.log("Вибраний файл: ", selectedFile);
    };

    const handleUpdateStatus = async () => {
        if (!selectedOrder || !updatedStatus) {
            setErrorMessage("Виберіть замовлення та статус для оновлення.");
            return;
        }
        try {
            logUserInput();
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("Токен відсутній. Увійдіть у систему.");
                router.push("/sigh-in");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${selectedOrder}/status`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: updatedStatus }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Не вдалося оновити статус.");
                return;
            }
            setSuccessMessage("Статус успішно оновлено.");
            setErrorMessage(null);
            fetchOrders(); // Оновлюємо дані замовлень після оновлення статусу
        } catch (error) {
            setErrorMessage("Сталася помилка під час оновлення статусу.");
        }
    };

    const handleUpdatePaymentStatus = async () => {
        if (!selectedOrder || !updatedPaymentStatus) {
            setErrorMessage("Виберіть замовлення та статус оплати для оновлення.");
            return;
        }
        try {
            logUserInput();
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("Токен відсутній. Увійдіть у систему.");
                router.push("/sigh-in");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${selectedOrder}/payment-status`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ paymentStatus: updatedPaymentStatus }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Не вдалося оновити статус оплати.");
                return;
            }
            setSuccessMessage("Статус оплати успішно оновлено.");
            setErrorMessage(null);
            fetchOrders();
        } catch (error) {
            setErrorMessage("Сталася помилка під час оновлення статусу оплати.");
        }
    };

    const handleUpdateCost = async () => {
        if (!selectedOrder || updatedCost === null) {
            setErrorMessage("Виберіть замовлення та введіть нову ціну.");
            return;
        }
        try {
            logUserInput();
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("Токен відсутній. Увійдіть у систему.");
                router.push("/sigh-in");
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${selectedOrder}/price`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cost: updatedCost }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Не вдалося оновити ціну.");
                return;
            }
            setSuccessMessage("Ціна успішно оновлена.");
            setErrorMessage(null);
            fetchOrders();
        } catch (error) {
            setErrorMessage("Сталася помилка під час оновлення ціни.");
        }
    };

    const handleAttachFile = async () => {
        if (!selectedOrder || !selectedFile) {
            setErrorMessage("Виберіть замовлення та файл.");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/sigh-in");
                return;
            }
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await fetch(
                `NEXT_PUBLIC_API_URL/admin/orders/${encodeURIComponent(selectedOrder)}/attach-file`,
                {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                }
            );

            if (response.ok) {
                setSuccessMessage("Файл прикріплено.");
                fetchOrders();
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Не вдалося прикріпити файл.");
            }
        } catch (error) {
            setErrorMessage("Сталася помилка під час прикріплення файлу.");
        }
    };

    const handleDownload = async (orderId: number, filePath: string) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${encodeURIComponent(orderId)}/download`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                const fileBlob = await response.blob();
                const decodedFileName = decodeURIComponent(filePath.split("/").pop() || "file");

                const link = document.createElement("a");
                link.href = URL.createObjectURL(fileBlob);
                link.download = decodedFileName;
                link.click();
                URL.revokeObjectURL(link.href);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Не вдалося завантажити файл.");
            }
        } catch (error) {
            setErrorMessage("Сталася помилка під час завантаження файлу.");
        }
    };

    const handleFilter = () => {
        const filtered = orders.filter((order) => {
            const matchesTopic = order.topic.toLowerCase().includes(topicFilter.toLowerCase());
            const matchesStatus = statusFilter ? order.status.toLowerCase() === statusFilter.toLowerCase() : true;
            return matchesTopic && matchesStatus;
        });
        setFilteredOrders(filtered);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        handleFilter(); // Викликаємо фільтрацію щоразу, коли змінюється тема або статус
    }, [topicFilter, statusFilter]);

    return (
        <div className="admin-cabinet">
            <Menu />
            <div className="cabinet-content">
                <div className='hello'>
                    <h1>Персональний кабінет менеджера</h1>
                    <button onClick={handleSignOut} className="nav-button">
                        Вийти
                    </button>
                </div>
                <div>
                    <select
                        onChange={(e) => setStatusFilter(e.target.value)}
                        value={statusFilter}
                        className="status-filter"
                    >
                        <option value="">Усі статуси</option>
                        {Object.keys(statusMap).map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Пошук за темою"
                        value={topicFilter}
                        onChange={(e) => setTopicFilter(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="orders-table-wrapper">
                    <table className="orders-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Тема</th>
                            <th>Дата подачі заявки</th>
                            <th>Ціна</th>
                            <th>Термін виконання</th>
                            <th>Коментар</th>
                            <th>Статус</th>
                            <th>Тема</th>
                            <th>Кількість сторінок</th>
                            <th>Статус оплати</th>
                            <th>Файл</th>
                            <th>Соціальні мережі</th>
                            <th>Дія</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.subject_name}</td>
                                    <td>{order.application_date}</td>
                                    <td>{order.cost}</td>
                                    <td>{order.deadline}</td>
                                    <td>{order.comment}</td>
                                    <td>{order.status}</td>
                                    <td>{order.topic}</td>
                                    <td>{order.number_of_pages}</td>
                                    <td>{order.payment_status}</td>
                                    <td>{order.file_path}</td>
                                    <td>{order.social_media}</td>
                                    <td>
                                        {order.file_path ? (
                                            <a
                                                onClick={() =>
                                                    handleDownload(order.id, order.file_path)
                                                }
                                                style={{ cursor: "pointer", color: "blue" }}
                                            >
                                                Завантажити
                                            </a>
                                        ) : (
                                            "Немає файлу"
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => setSelectedOrder(order.id)}>
                                            Вибрати
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={12}>Немає замовлень для відображення</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {selectedOrder && (
                    <div className="order-actions">
                        <h2>Дії з вибраним замовленням</h2>
                        <div className="action-block">
                            <h3>Оновити статус</h3>
                            <select
                                onChange={(e) => setUpdatedStatus(e.target.value)}
                                value={updatedStatus}
                            >
                                <option value="">Оберіть статус</option>
                                {Object.keys(statusMap).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleUpdateStatus}>Оновити статус</button>
                        </div>
                        <div className="action-block">
                            <h3>Оновити статус оплати</h3>
                            <select
                                onChange={(e) => setUpdatedPaymentStatus(e.target.value)}
                                value={updatedPaymentStatus}
                            >
                                <option value="">Оберіть статус оплати</option>
                                {Object.keys(paymentStatusMap).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleUpdatePaymentStatus}>Оновити статус оплати</button>
                        </div>
                        <div className="action-block">
                            <h3>Оновити ціну</h3>
                            <input
                                type="number"
                                placeholder="Введіть нову ціну"
                                value={updatedCost || ""}
                                onChange={(e) => setUpdatedCost(Number(e.target.value))}
                            />
                            <button onClick={handleUpdateCost}>Оновити ціну</button>
                        </div>
                        <div className="action-block">
                            <h3>Прикріпити файл</h3>
                            <input
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            />
                            <button onClick={handleAttachFile}>Прикріпити файл</button>
                        </div>
                    </div>
                )}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
            <FooterComponent />
        </div>
    );
};

export default AdminCabinet;
