import './modalWidowPay.style.css';

export class ModalWidowPay {
    private readonly id: string;
    constructor(id: string) {
        this.id = id;
    }

    public render(): void {
        const body = <HTMLBodyElement>document.getElementById(this.id);
        const modalWidowWrap = <HTMLDivElement>document.createElement('div');
        modalWidowWrap.className = 'modalWidowWrap';
        body.appendChild(modalWidowWrap);

        modalWidowWrap.innerHTML = `
        <form action="">
            <span>Personal details</span>
            <input type="text" placeholder="Name">
            <input type="text" placeholder="Phone number">
            <input type="text" placeholder="Delivery address">
            <input type="text" placeholder="E-mail">
            <span>Cradit card details</span>
            <div class="modal_card">
                <input type="text" placeholder="Card number">
                <div class="modal_card_info">
                    <input type="text" placeholder="Valid Thru">
                    <input type="text" placeholder="Code">
                </div>
            </div>
            <input type="submit" value="CONFIRM" class="submit">
        </form>`;

        modalWidowWrap.addEventListener('click', (event) => {
            if (event.target === modalWidowWrap) {
                modalWidowWrap.remove();
            }
        });
    }
}
