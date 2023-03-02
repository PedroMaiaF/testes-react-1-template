import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoList from "../components/TodoList"

describe("TodoList", () => {
    test("deve renderizar com título", () => {
        render(<TodoList />)
        // screen.debug()
        // const title = screen.getByText("Todo List")
        const title = screen.getByText(/todo list/i)
        expect(title).toBeInTheDocument()
    })

    test("deve renderizar com input vazio", () => {
        render(<TodoList />)
        // screen.debug()
        const input = screen.getByPlaceholderText(/enter a todo/i)
        expect(input).toHaveValue("")
    })

    test("deve atualizar valor do input ao ser digitado", async () => {
        const user = userEvent.setup()

        render(<TodoList />)
        // screen.debug()
        const input = screen.getByPlaceholderText(/enter a todo/i)

        // interagir
        await user.type(input, "Revisar React")

        // assertiva acerca do valor do input
        expect(input).toHaveValue("Revisar React")
    })

    test(
        "deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla ENTER",
        async () => {
            const user = userEvent.setup()

            render(<TodoList />)

            const input = screen.getByPlaceholderText(/enter a todo/i)

            await user.type(input, "Revisar React{enter}")

            const item = screen.getByText("Revisar React")

            expect(input).toHaveValue("")
            expect(item).toBeInTheDocument()
        })

    test(
        "deve alterar o status da tarefa quando o botão de alterar status for clicado",
        async () => {
            const user = userEvent.setup()

            render(<TodoList />)

            const input = screen.getByPlaceholderText(/enter a todo/i)

            await user.type(input, "Revisar React{enter}")

            // screen.logTestingPlaygroundURL()
            
            const toggleBtn = screen.getByRole('button', {
                name: /toggle/i
            })

            const item = screen.getByText("Revisar React")

            await user.click(toggleBtn)
            expect(item).toHaveStyle("text-decoration: line-through")

            await user.click(toggleBtn)
            expect(item).toHaveStyle("text-decoration: none")
        })
})
