import { addPropertyControls, ControlType } from "framer"
import { useEffect, useState } from "react"
import CourseCard, { type Course } from "./CourseCard.tsx"

type CoursesProps = {
    cardBackground: string
    cardRadius: number
}

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Courses(props: CoursesProps) {
    const baseUrl = "https://syncsphere-hiv6.onrender.com"
    const { cardBackground, cardRadius } = props

    const [courses, setCourses] = useState<Course[]>([])
    const [currency, setCurrency] = useState("")
    const [coursesLoading, setCoursesLoading] = useState(true)
    const [currencyLoading, setCurrencyLoading] = useState(true)
    const [coursesError, setCoursesError] = useState(false)
    const [currencyError, setCurrencyError] = useState(false)

    const fetchCourses = async () => {
        setCoursesLoading(true)
        setCoursesError(false)

        try {
            const response = await fetch(`${baseUrl}/assignment/course-data`)

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const result = await response.json()

            if (!Array.isArray(result)) {
                throw new Error("Invalid course data")
            }

            setCourses(result)
        } catch (error) {
            console.error("Failed to fetch courses:", error)
            setCoursesError(true)
            setCourses([])
        } finally {
            setCoursesLoading(false)
        }
    }

    const fetchCurrency = async () => {
        setCurrencyLoading(true)
        setCurrencyError(false)

        try {
            const response = await fetch(`${baseUrl}/assignment/country-code`)

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const result = await response.json()

            if (result.country_code !== "IN" && result.country_code !== "US") {
                throw new Error("Invalid country code")
            }

            setCurrency(result.country_code)
        } catch (error) {
            console.error("Failed to fetch currency:", error)
            setCurrencyError(true)
            setCurrency("")
        } finally {
            setCurrencyLoading(false)
        }
    }

    const retry = () => {
        fetchCourses()
        fetchCurrency()
    }

    useEffect(() => {
        fetchCourses()
        fetchCurrency()
    }, [])

    // -------------------------
    // Loading state
    // -------------------------

    if (coursesLoading) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: 40,
                    textAlign: "center",
                    fontSize: 16,
                    color: "#666",
                }}
            >
                Loading courses...
            </div>
        )
    }

    // -------------------------
    // Course API error state
    // -------------------------

    if (coursesError) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: 48,
                    textAlign: "center",
                    backgroundColor: "#FAFAFA",
                    borderRadius: 16,
                    border: "1px solid #E5E5E5",
                    boxSizing: "border-box",
                }}
            >
                <h3
                    style={{
                        margin: "0 0 8px",
                        fontSize: 20,
                        color: "#111",
                    }}
                >
                    Couldn't load courses
                </h3>

                <p
                    style={{
                        margin: "0 0 20px",
                        color: "#666",
                        fontSize: 15,
                    }}
                >
                    Something went wrong. Please try again.
                </p>

                <button
                    onClick={retry}
                    style={{
                        border: "none",
                        backgroundColor: "#111",
                        color: "#fff",
                        padding: "11px 18px",
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Try Again
                </button>
            </div>
        )
    }

    // -------------------------
    // Empty state
    // -------------------------

    if (courses.length === 0) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: 48,
                    textAlign: "center",
                    backgroundColor: "#FAFAFA",
                    borderRadius: 16,
                    border: "1px solid #E5E5E5",
                    boxSizing: "border-box",
                }}
            >
                <h3
                    style={{
                        margin: "0 0 8px",
                        fontSize: 20,
                        color: "#111",
                    }}
                >
                    No courses available
                </h3>

                <p
                    style={{
                        margin: "0 0 20px",
                        color: "#666",
                        fontSize: 15,
                    }}
                >
                    Check back soon for new courses.
                </p>

                <button
                    onClick={retry}
                    style={{
                        border: "none",
                        backgroundColor: "#111",
                        color: "#fff",
                        padding: "11px 18px",
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Refresh
                </button>
            </div>
        )
    }

    // -------------------------
    // Working state
    // -------------------------

    return (
        <>
            <style>
                {`
                    .courses-grid {
                        display: grid;
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                        gap: 24px;
                        width: 100%;
                    }

                    @media (max-width: 991px) {
                        .courses-grid {
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                        }
                    }

                    @media (max-width: 767px) {
                        .courses-grid {
                            grid-template-columns: 1fr;
                            gap: 16px;
                        }
                    }
                `}
            </style>

            <div className="courses-grid">
                {courses.map((course) => (
                    <CourseCard
                        key={course.courseCode}
                        course={course}
                        currency={currency}
                        currencyLoading={currencyLoading}
                        currencyError={currencyError}
                        cardBackground={cardBackground}
                        cardRadius={cardRadius}
                    />
                ))}
            </div>
        </>
    )
}

addPropertyControls(Courses, {
    cardBackground: {
        title: "Card Background",
        type: ControlType.Color,
        defaultValue: "#FFFFFF",
    },

    cardRadius: {
        title: "Card Radius",
        type: ControlType.Number,
        defaultValue: 16,
        min: 0,
        max: 40,
        step: 1,
        unit: "px",
    },
})
