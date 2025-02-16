class GUI {

    containerAnimation: HTMLElement = document.querySelector('.sidebar__animations')!
    animationList: HTMLElement = document.querySelector('.animations__list')!

    constructor() {
        this.setVisibility(false)
    }

    createAnimationList(animationsList: any[]) {
        this.setVisibility(false)

        if (animationsList.length == 0) {
            const li = this.createLI('No animation found', null)
            this.animationList.appendChild(li)
        } else {
            animationsList.forEach((item) => {
                const li = this.createLI(item.name, item.isPlaying)
                this.animationList.appendChild(li)
            })
        }

        this.setVisibility(true)
    }

    createLI(text: string, isPlaying) {
        const icon = this.seticon(isPlaying)
        const li = document.createElement('li')
        li.classList.add('animations__item')
        li.innerText = text
        li.appendChild(icon)
        return li
    }

    clearListAnimation() {
        this.animationList.innerHTML = ''
    }

    setVisibility(show: boolean) {
        this.containerAnimation.style.display = show ? 'block' : 'none'
    }

    seticon(isPlaying) {

        const icon = document.createElement('i')
        icon.classList.add('bi')

        if (isPlaying == undefined) {
            icon.classList.add(`bi-backspace-reverse`)
        } else if (isPlaying) {
            icon.classList.add(`bi-play`)
        } else {
            icon.classList.add(`bi-stop`)
        }

        return icon
    }

    changeIcon(liElement: HTMLElement) {
        const iElement = liElement.querySelector('i');
        iElement.style.pointerEvents = 'none';
        const biPlay = iElement.classList.contains('bi-play')
        const biStop = iElement.classList.contains('bi-stop')

        if (biPlay) {
            iElement.classList.remove('bi-play');
            iElement.classList.add('bi-stop');
        } else if(biStop){
            iElement.classList.remove('bi-stop');
            iElement.classList.add('bi-play');
        }

    }

    eventListener(handleAnimation) {
        const items = this.animationList.querySelectorAll('.animations__item')
        items.forEach((item) => {
            item.addEventListener('click', (ev: any) => {
                const animationName = ev.target.innerText
                if (handleAnimation) {
                    handleAnimation(animationName)
                    this.changeIcon(item as HTMLElement)
                }
            })
        })
    }

}

export default GUI