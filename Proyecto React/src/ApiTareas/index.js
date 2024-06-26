export const getTarea = async () => {
    const url = "http://localhost:3000/api/tasks";
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Ocurrió un error");
            return [];
        }
    }
    catch (error) {
        console.error(error);
        return [];
    }
}