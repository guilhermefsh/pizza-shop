import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('order status', () => {
    it('should display the right text when order status is pending', () => {

        // pending
        let wrapper = render(<OrderStatus status="pending" />)

        let statusText = wrapper.getByText('Pendente')
        let badgeElements = wrapper.getAllByTestId('badge')

        let badgeElement = badgeElements[0]

        console.log(badgeElement.outerHTML)

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-slate-400')
    })

    it("should display the right text when order status is canceled", () => {
        // cancel
        const wrapper = render(<OrderStatus status="canceled" />)

        const statusText = wrapper.getByText('Cancelado')
        const badgeElements = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElements).toHaveClass('bg-rose-500')
    })

    it('should display the right text when order status is delivering', () => {
        const wrapper = render(<OrderStatus status="delivering" />)

        const statusText = wrapper.getByText('Em entrega')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-amber-500')
    })

    it('should display the right text when order status is processing', () => {
        const wrapper = render(<OrderStatus status="processing" />)

        const statusText = wrapper.getByText('Em preparo')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-amber-500')
    })

    it('should display the right text when order status is delivered', () => {
        const wrapper = render(<OrderStatus status="delivered" />)

        const statusText = wrapper.getByText('Entregue')
        const badgeElement = wrapper.getByTestId('badge')

        expect(statusText).toBeInTheDocument()
        expect(badgeElement).toHaveClass('bg-emerald-500')
    })

})
