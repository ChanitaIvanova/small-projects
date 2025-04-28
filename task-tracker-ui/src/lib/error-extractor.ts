const extractError = (error: any, field: string): string | null => {
    return error.errors.find((err: any) => err.path.includes(field))?.message || null
}

export default extractError