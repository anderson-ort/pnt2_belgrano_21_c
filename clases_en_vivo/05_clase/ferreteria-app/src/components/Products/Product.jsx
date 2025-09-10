import style from "./Product.module.css"

export const Product = ({ name, description }) => {
    return (
        <div className={style.card}>
            <div className={style.title}>{name}</div>
            <div className={style.icon}>
                <i className="fas fa-box"></i>
            </div>
            <div className={style.content}>
                <p>{description}</p>
            </div>
        </div>
    )
}
