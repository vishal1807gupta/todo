import React from "react";

const Download = ({items,user})=>{

    const handlePdf = async()=>{
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text('User Tasks:', 10, 10);

        let yPosition = 20;
        items.forEach((task,index) => {
            const taskText = `${index + 1}. ${(task.stat===false)?'Pending':'Completed'} - ${task.value}`;
            doc.text(taskText, 10, yPosition);
            yPosition += 10; // Move down for each task
        });
        doc.save(`tasks_${user}.pdf`);
    }

    const handleText = ()=>{
        const textContent = items.map((task, index) => `${index + 1}. ${(task.stat===false)?'Pending':'Completed'} - ${task.value}`).join('\n');
        const blob = new Blob([textContent], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `tasks_${user}.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    return (
        <div className="flex justify-center items-center mt-4">
        <button className="bg-red-700 text-white px-2 py-1" onClick={handlePdf}>Download Pdf</button>
        <button className="bg-black text-white px-2 py-1" onClick={handleText}>Download Text</button>
        </div>
    )
}

export default Download;