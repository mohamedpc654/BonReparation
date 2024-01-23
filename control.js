
async function generatePDF() {
  const tel = document.getElementsByName("T6")[0].value;
  const tel2 = document.getElementsByName("T6")[0].value;
  const Nappel = document.getElementsByName("T1")[0].value;
  const Nappel2 = document.getElementsByName("T1")[0].value;
  const Date = document.getElementsByName("T2")[0].value;
  const Heure = document.getElementsByName("T3")[0].value;
  const CodeC = document.getElementsByName("T4")[0].value;
  const CodeC2 = document.getElementsByName("T5")[0].value;
  const status = document.getElementsByName("T9")[0].value;
  const devis = document.getElementsByName("T10")[0].value;

  const fraislivraison = document.getElementsByName("T11")[0].value;
  const facture = document.getElementsByName("T12")[0].value;

  const panne = document.getElementsByName("S1")[0].value;
  const accessoire = document.getElementsByName("S2")[0].value;

  const Diagnostique = document.getElementsByName("S3")[0].value;
  const travail = document.getElementsByName("S4")[0].value;
  const pieces = document.getElementsByName("S5")[0].value;


  const Ref = document.getElementsByName("T7")[0].value;
  const nserie = document.getElementsByName("T8")[0].value;
  const Designation = document.getElementsByName("DA")[0].value;
  /*************** */
  const Date1 = document.getElementsByName("T2")[0].value;
  const Heure1 = document.getElementsByName("T3")[0].value;
  const CodeC1 = document.getElementsByName("T4")[0].value;
  const CodeC21 = document.getElementsByName("T5")[0].value;
  // Get the selected PDF file
  const pdfFileInput = document.getElementById("pdfFile");
  const pdfFile = pdfFileInput.files[0];

  if (!pdfFile) {
    alert("Please select an existing PDF file.");
    return;
  }

  const existingPdfBytes = await pdfFile.arrayBuffer();
  const existingPdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

  // Get the first page of the template
  const page = existingPdfDoc.getPage(0);

  const dpi = 96; // Adjust this based on your device's DPI

  // Convert pixels to points
  function pxToPoints(px) {
    return (px / dpi) * 72;
  }

  // Usage in your code
  // print frais ,facture
  page.drawText(fraislivraison, { x: pxToPoints(665), y: pxToPoints(355), size: 10 });
  page.drawText(facture, { x: pxToPoints(930), y: pxToPoints(355), size: 10 });

  //print diagnostique, travail effectue, pieces echangees
  page.drawText(Diagnostique, { x: pxToPoints(560), y: pxToPoints(570), size: 10 });
  page.drawText(travail, { x: pxToPoints(560), y: pxToPoints(500), size: 10 });
  page.drawText(pieces, { x: pxToPoints(560), y: pxToPoints(435), size: 10 });

  // print Declaration panne, accessoire
  page.drawText(panne, { x: pxToPoints(20), y: pxToPoints(480), size: 10 });
  page.drawText(accessoire, { x: pxToPoints(20), y: pxToPoints(410), size: 10 });


  // print Ref ,nserie and designation article
  page.drawText(Ref, { x: pxToPoints(100), y: pxToPoints(566), size: 10 });
  page.drawText(Designation, {x: pxToPoints(100),y: pxToPoints(543),size: 10,});
  page.drawText(nserie, { x: pxToPoints(100), y: pxToPoints(520), size: 10 });
  // print status and devis
  page.drawText(status, { x: pxToPoints(950), y: pxToPoints(705), size: 10 });
  page.drawText(devis, { x: pxToPoints(950), y: pxToPoints(682), size: 10 });

  // print date heure code client in bon reception
  page.drawText(Date, { x: pxToPoints(100), y: pxToPoints(682), size: 10 });
  page.drawText(Heure, { x: pxToPoints(100), y: pxToPoints(658), size: 10 });
  page.drawText(CodeC, { x: pxToPoints(100), y: pxToPoints(635), size: 10 });
  page.drawText(CodeC2, { x: pxToPoints(200), y: pxToPoints(635), size: 10 });

  // print date heure code client in bon reparation

  page.drawText(Date1, { x: pxToPoints(650), y: pxToPoints(682), size: 10 });
  page.drawText(Heure1, { x: pxToPoints(650), y: pxToPoints(658), size: 10 });
  page.drawText(CodeC1, { x: pxToPoints(650), y: pxToPoints(635), size: 10 });
  page.drawText(CodeC21, { x: pxToPoints(750), y: pxToPoints(635), size: 10 });
  // print nappel in bon reception,reparation

  page.drawText(Nappel, { x: pxToPoints(100), y: pxToPoints(705), size: 10 });
  page.drawText(Nappel2, { x: pxToPoints(650), y: pxToPoints(705), size: 10 });
  // print tel in bon reception,reparation

  page.drawText(tel, { x: pxToPoints(100), y: pxToPoints(610), size: 10 });
  page.drawText(tel2, { x: pxToPoints(650), y: pxToPoints(610), size: 10 });

  /*
  // Set form field values
  page.drawText(name, { x: 10, y: 50 });
  page.drawText(email, { x: 100, y: 450 });*/

  // Save the modified PDF
  const modifiedBytes = await existingPdfDoc.save();
  const modifiedBlob = new Blob([modifiedBytes], { type: "application/pdf" });

  // Create a download link and trigger the download
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(modifiedBlob);
  downloadLink.download = "output.pdf";
  downloadLink.click();
}
