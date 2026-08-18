import { motion } from "framer-motion"

export type Course = {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse: string
    courseType: string
    pricePaise: number
    priceUsdCents: number
    mangoId: string
    refundable: boolean
}

type CourseCardProps = {
    course: Course
    currency: string
    currencyLoading: boolean
    currencyError: boolean
    cardBackground: string
    cardRadius: number
}

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function CourseCard(props: CourseCardProps) {
    const {
        course,
        currency,
        currencyLoading,
        currencyError,
        cardBackground,
        cardRadius,
    } = props

    const getPrice = () => {
        if (currencyLoading) return "Loading price..."
        if (currencyError) return "Price unavailable"

        if (currency === "US") {
            return `$${(course.priceUsdCents / 100).toFixed(2)}`
        }

        if (currency === "IN") {
            return `₹${(course.pricePaise / 100).toFixed(2)}`
        }

        return "Price unavailable"
    }

    return (
        <>
            <style>
                {`
                    .course-title {
                        font-size: 24px;
                    }

                    .course-description {
                        font-size: 15px;
                    }

                    .course-price {
                        font-size: 18px;
                    }

                    .course-button {
                        font-size: 13px;
                        padding: 9px 14px;
                    }

                    @media (max-width: 767px) {
                        .course-title {
                            font-size: 21px;
                        }

                        .course-description {
                            font-size: 14px;
                        }

                        .course-price {
                            font-size: 16px;
                        }

                        .course-button {
                            font-size: 12px;
                            padding: 8px 12px;
                        }
                    }
                `}
            </style>

            <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                    width: "100%",
                    minHeight: 260,
                    boxSizing: "border-box",
                    padding: 22,
                    backgroundColor: cardBackground,
                    border: "1px solid #E5E5E5",
                    borderRadius: cardRadius,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <p
                    style={{
                        margin: "0 0 8px",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#777",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    {course.mainCategory}
                </p>

                <h2
                    className="course-title"
                    style={{
                        margin: "0 0 10px",
                        lineHeight: 1.2,
                        color: "#111",
                    }}
                >
                    {course.courseName}
                </h2>

                <p
                    className="course-description"
                    style={{
                        margin: "0 0 14px",
                        lineHeight: 1.5,
                        color: "#666",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {course.description}
                </p>

                {course.refundable && (
                    <span
                        style={{
                            alignSelf: "flex-start",
                            padding: "5px 8px",
                            marginBottom: 16,
                            borderRadius: 999,
                            backgroundColor: "#F1F8F3",
                            color: "#287A43",
                            fontSize: 11,
                            fontWeight: 600,
                        }}
                    >
                        ✓ Refundable
                    </span>
                )}

                <div
                    style={{
                        marginTop: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                    }}
                >
                    <span
                        className="course-price"
                        style={{
                            fontWeight: 600,
                            color: "#111",
                        }}
                    >
                        {getPrice()}
                    </span>

                    <button
                        className="course-button"
                        style={{
                            flexShrink: 0,
                            border: "none",
                            borderRadius: 9,
                            backgroundColor: "#111",
                            color: "#fff",
                            fontWeight: 600,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}
                    >
                        View Course
                    </button>
                </div>
            </motion.div>
        </>
    )
}
