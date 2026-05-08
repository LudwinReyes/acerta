import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import { PayrollInput, PayrollResult } from './payrollEngine';

// Register fonts if needed, built-in fonts are Helvetica, Times, Courier. We'll use Helvetica as a clean sans-serif.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#102C57',
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#1679AB',
    borderRadius: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#102C57',
  },
  headerTitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#102C57',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  mainRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  column: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
  },
  columnLeft: {
    backgroundColor: '#f8fafc',
    borderTopWidth: 4,
    borderTopColor: '#1679AB',
  },
  columnRight: {
    backgroundColor: '#102C57',
    borderTopWidth: 4,
    borderTopColor: '#1679AB',
  },
  colTitleLeft: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#102C57',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  colTitleRight: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 4,
  },
  rowItemRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    paddingBottom: 4,
  },
  rowLabelLeft: {
    fontSize: 10,
    color: '#64748b',
  },
  rowValueLeft: {
    fontSize: 10,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  rowLabelRight: {
    fontSize: 10,
    color: '#94a3b8',
  },
  rowValueRight: {
    fontSize: 10,
    color: '#f8fafc',
    fontWeight: 'bold',
  },
  totalContainerLeft: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#102C57',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalContainerRight: {
    marginTop: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderTopWidth: 2,
    borderTopColor: '#1679AB',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  totalLabelBoxRight: {
    flexDirection: 'column',
    flexShrink: 0,
  },
  totalLabelRightTop: {
    fontSize: 14,
    color: '#f8fafc',
    fontWeight: 'bold',
  },
  totalLabelRightBottom: {
    fontSize: 14,
    color: '#f8fafc',
    fontWeight: 'bold',
  },
  totalValueBoxRight: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  totalLabelLeft: {
    fontSize: 14,
    color: '#102C57',
    fontWeight: 'bold',
  },
  totalValueLeft: {
    fontSize: 18,
    color: '#1679AB',
    fontWeight: 'bold',
  },
  totalLabelRight: {
    fontSize: 14,
    color: '#f8fafc',
    fontWeight: 'bold',
  },
  totalValueRight: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  insightsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1679AB',
  },
  insightsTitle: {
    fontSize: 12,
    color: '#102C57',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  insightItem: {
    fontSize: 10,
    color: '#334155',
    marginBottom: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 8,
    color: '#94a3b8',
    width: '70%',
  },
  qrContainer: {
    width: 60,
    height: 60,
  },
});

const formatPEN = (val: number) => {
  return 'S/ ' + val.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const PayrollPDF = ({
  input,
  result,
  qrDataUrl
}: {
  input: PayrollInput;
  result: PayrollResult;
  qrDataUrl: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image src="/img/acerta/acerta-logo.png" style={{ height: 28, width: 100 }} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Simulación de Nómina Proyectada</Text>
          <Text style={styles.headerSubtitle}>Año Fiscal 2026</Text>
        </View>
      </View>

      {/* Two columns layout */}
      <View style={styles.mainRow}>

        {/* Left Column: Worker (Neto) */}
        <View style={[styles.column, styles.columnLeft]}>
          <Text style={styles.colTitleLeft}>Lo que el empleado recibe</Text>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabelLeft}>Sueldo Base</Text>
            <Text style={styles.rowValueLeft}>{formatPEN(input.sueldoBase)}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabelLeft}>Bonificaciones</Text>
            <Text style={styles.rowValueLeft}>{formatPEN(input.bonificaciones)}</Text>
          </View>
          {input.tieneAsignacionFamiliar && (
            <View style={styles.rowItem}>
              <Text style={styles.rowLabelLeft}>Asignación Familiar</Text>
              <Text style={styles.rowValueLeft}>{formatPEN(113)}</Text>
            </View>
          )}
          <View style={styles.rowItem}>
            <Text style={styles.rowLabelLeft}>Ingreso Bruto Mensual</Text>
            <Text style={styles.rowValueLeft}>{formatPEN(result.brutoMensual)}</Text>
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabelLeft}>Aporte Pensión ({input.sistemaPension})</Text>
            <Text style={[styles.rowValueLeft, { color: '#ef4444' }]}>- {formatPEN(result.descuentoPension)}</Text>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabelLeft}>Retención 5ta Categoría</Text>
            <Text style={[styles.rowValueLeft, { color: '#ef4444' }]}>- {formatPEN(result.renta5taMensual)}</Text>
          </View>

          <View style={styles.totalContainerLeft}>
            <Text style={styles.totalLabelLeft}>Neto Mensual</Text>
            <Text style={styles.totalValueLeft}>{formatPEN(result.netoMensual)}</Text>
          </View>
        </View>

        {/* Right Column: Employer (Costo) */}
        <View style={[styles.column, styles.columnRight]}>
          <Text style={styles.colTitleRight}>Lo que la empresa invierte</Text>

          <View style={styles.rowItemRight}>
            <Text style={styles.rowLabelRight}>Salario Bruto</Text>
            <Text style={styles.rowValueRight}>{formatPEN(result.brutoMensual)}</Text>
          </View>

          <View style={styles.rowItemRight}>
            <Text style={styles.rowLabelRight}>Aporte Essalud (9%)</Text>
            <Text style={styles.rowValueRight}>{formatPEN(result.costoEssalud)}</Text>
          </View>

          <View style={styles.rowItemRight}>
            <Text style={styles.rowLabelRight}>Provisión CTS (mensual)</Text>
            <Text style={styles.rowValueRight}>{formatPEN(result.provisionCTS)}</Text>
          </View>

          <View style={styles.rowItemRight}>
            <Text style={styles.rowLabelRight}>Provisión Gratificación (mensual)</Text>
            <Text style={styles.rowValueRight}>{formatPEN(result.provisionGratificacion)}</Text>
          </View>

          <View style={styles.totalContainerRight}>
            <View style={styles.totalLabelBoxRight}>
              <Text style={styles.totalLabelRightTop}>Costo Total</Text>
              <Text style={styles.totalLabelRightBottom}>Empleado</Text>
            </View>
            <View style={styles.totalValueBoxRight}>
              <Text style={styles.totalValueRight}>{formatPEN(result.costoTotalEmpresa)}</Text>
            </View>
          </View>
        </View>

      </View>

      {/* AI Insights */}
      {result.smartInsights.length > 0 && (
        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>Acerta AI Insights</Text>
          {result.smartInsights.map((insight, idx) => (
            <Text key={idx} style={styles.insightItem}>• {insight}</Text>
          ))}
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Documento generado por el motor inteligente de Acerta - Soluciones Empresariales.
          Régimen General Perú - Leyes aplicables para el ejercicio 2026.
          Sujeto a variaciones según actualizaciones de la SUNAT.
        </Text>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        {qrDataUrl && (
          <Image style={styles.qrContainer} src={qrDataUrl} />
        )}
      </View>

    </Page>
  </Document>
);

export async function generateQRCodeUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, { errorCorrectionLevel: 'M', margin: 1 });
  } catch (err) {
    console.error(err);
    return '';
  }
}
