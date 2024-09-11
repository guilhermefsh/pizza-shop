import { render } from "@testing-library/react"
import { Pagination } from "./pagination"
import userEvent from '@testing-library/user-event'
import { vi } from "vitest"

const onPageChangeCallBack = vi.fn()

describe('Pagination', () => {
    beforeEach(() => {
        onPageChangeCallBack.mockClear()
    })
    it('should display the right amount of pages and results', () => {
        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={() => { }}
            />)

        expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
        expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
    })

    it('should be able to navigate to the next page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallBack}
            />)

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Próxima página'
        })


        await user.click(nextPageButton)

        expect(onPageChangeCallBack).toHaveBeenCalledWith(1)

        // expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
        // expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()


    })

    it('should be able to navigate to the previus page', async () => {
        const user = userEvent.setup()
        const wrapper = render(
            <Pagination
                pageIndex={2}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallBack}
            />)

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Primeira página'
        })


        await user.click(nextPageButton)

        expect(onPageChangeCallBack).toHaveBeenCalledWith(0)

    })

    it('should be able to navigate to the last page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallBack}
            />)

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Última página'
        })


        await user.click(nextPageButton)

        expect(onPageChangeCallBack).toHaveBeenCalledWith(19)

    })
})