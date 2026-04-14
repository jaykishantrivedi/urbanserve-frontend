import { jsPDF } from "jspdf"

/**
 * Generates and downloads a PDF receipt.
 * @param {Object} opts
 * @param {Object} opts.booking  - Booking object (populated)
 * @param {Object} opts.payment  - Payment object
 */

export function generateReceipt({ booking, payment }) {
    const doc = new jsPDF({ unit: "mm", format: "a4" })
    const W = 210
    const margin = 16
    let y = 0

    //  Header Brand Bar 
    doc.setFillColor(37, 99, 235)
    doc.rect(0, 0, W, 30, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("UrbanServe", margin, 13)

    doc.setFontSize(8.5)
    doc.setFont("helvetica", "normal")
    doc.text("Your Trusted Home Service Partner", margin, 21)

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("PAYMENT RECEIPT", W - margin, 13, { align: "right" })
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.text(`Generated: ${new Date().toLocaleString("en-IN")}`, W - margin, 21, { align: "right" })

    y = 38

    //  Success Badge 
    doc.setFillColor(236, 253, 245)
    doc.roundedRect(margin, y, W - margin * 2, 13, 3, 3, "F")
    doc.setTextColor(5, 150, 105)
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("  Payment Successful", W / 2, y + 8.5, { align: "center" })

    y += 20

    //  Two Column Info Cards 
    const colW = (W - margin * 2 - 5) / 2
    const cardH = 38

    const trunc = (str, max = 28) => {
        if (!str) return "N/A"
        return str.length > max ? str.slice(0, max - 1) + "…" : str
    }

    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin, y, colW, cardH, 2, 2, "F")
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(margin, y, colW, cardH, 2, 2, "S")

    doc.setTextColor(100, 116, 139)
    doc.setFontSize(7)
    doc.setFont("helvetica", "bold")
    doc.text("BOOKING DETAILS", margin + 4, y + 7)

    doc.setTextColor(15, 23, 42)
    doc.setFontSize(8)
    doc.setFont("helvetica", "bold")
    doc.text("Booking ID", margin + 4, y + 14)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.text(booking?._id?.toString()?.slice(-14) || "N/A", margin + 4, y + 19)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.text("Service Date", margin + 4, y + 27)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.text(
        booking?.serviceDate
            ? new Date(booking.serviceDate).toLocaleDateString("en-IN", { dateStyle: "long" })
            : "N/A",
        margin + 4, y + 32
    )

    const rx = margin + colW + 5
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(rx, y, colW, cardH, 2, 2, "F")
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(rx, y, colW, cardH, 2, 2, "S")

    doc.setTextColor(100, 116, 139)
    doc.setFontSize(7)
    doc.setFont("helvetica", "bold")
    doc.text("PAYMENT INFORMATION", rx + 4, y + 7)

    // Build Transaction ID: transactionId = razorpay_payment_id set on verify, else "Cash Payment"
    const txnId = payment?.transactionId
        || (payment?.paymentMethod === "cash" ? "Cash Payment" : "—")

    doc.setTextColor(15, 23, 42)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.text("Transaction ID", rx + 4, y + 14)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.text(trunc(txnId, 24), rx + 4, y + 19)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.text("Payment Method", rx + 4, y + 27)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    const methodDisplay = payment?.paymentMethod === "cash" ? "CASH" : "RAZORPAY (ONLINE)"
    doc.text(methodDisplay, rx + 4, y + 32)

    y += cardH + 7

    //  Service Information 
    // Each field on its own row to avoid overlap
    const serviceRows = [
        ["Service", booking?.service?.serviceName || "N/A"],
        ["Provider", booking?.provider?.businessName || "N/A"],
        ["Location", booking?.location || "N/A"],
        ["Time", booking?.serviceTime || "N/A"],
    ]
    const svcCardH = 10 + serviceRows.length * 9

    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin, y, W - margin * 2, svcCardH, 2, 2, "F")
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(margin, y, W - margin * 2, svcCardH, 2, 2, "S")

    doc.setTextColor(100, 116, 139)
    doc.setFontSize(7)
    doc.setFont("helvetica", "bold")
    doc.text("SERVICE INFORMATION", margin + 4, y + 7)

    serviceRows.forEach(([label, value], i) => {
        const rowY = y + 14 + i * 9
        doc.setTextColor(100, 116, 139)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(7.5)
        doc.text(`${label}:`, margin + 4, rowY)

        doc.setTextColor(15, 23, 42)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(8)
        doc.text(trunc(value, 55), margin + 28, rowY)
    })

    y += svcCardH + 7

    //  Amount Breakdown 
    const totalAmt = payment?.amount || 0
    const commAmt = payment?.adminAmount || 0
    const provAmt = payment?.providerAmount || 0
    const commPct = payment?.platformCommissionPct || 10

    const amtRows = [
        ["Service Amount", `Rs. ${totalAmt.toLocaleString("en-IN")}`],
        [`Platform Fee (${commPct}%)`, `Rs. ${commAmt.toLocaleString("en-IN")}`],
        ["Provider Receives", `Rs. ${provAmt.toLocaleString("en-IN")}`],
    ]
    const amtCardH = 10 + amtRows.length * 9 + 3

    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin, y, W - margin * 2, amtCardH, 2, 2, "F")
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(margin, y, W - margin * 2, amtCardH, 2, 2, "S")

    doc.setTextColor(100, 116, 139)
    doc.setFontSize(7)
    doc.setFont("helvetica", "bold")
    doc.text("AMOUNT BREAKDOWN", margin + 4, y + 7)

    amtRows.forEach(([label, value], i) => {
        const rowY = y + 14 + i * 9
        doc.setTextColor(71, 85, 105)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(8.5)
        doc.text(label, margin + 5, rowY)
        doc.text(value, W - margin - 4, rowY, { align: "right" })
        if (i < amtRows.length - 1) {
            doc.setDrawColor(226, 232, 240)
            doc.line(margin + 4, rowY + 3, W - margin - 4, rowY + 3)
        }
    })

    y += amtCardH + 5
    doc.setFillColor(37, 99, 235)
    doc.roundedRect(margin, y, W - margin * 2, 13, 2, 2, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.text("Total Paid", margin + 5, y + 8.5)
    doc.text(`Rs. ${totalAmt.toLocaleString("en-IN")}`, W - margin - 4, y + 8.5, { align: "right" })

    y += 20

    //  Footer
    doc.setTextColor(148, 163, 184)
    doc.setFontSize(7.5)
    doc.setFont("helvetica", "normal")
    doc.text("Thank you for choosing UrbanServe!", W / 2, y, { align: "center" })
    doc.text("support@urbanserve.in  |  www.urbanserve.in", W / 2, y + 6, { align: "center" })

    // Save
    const filename = `UrbanServe_Receipt_${booking?._id?.toString()?.slice(-8) || "booking"}.pdf`
    doc.save(filename)
}
