import { Link } from "@tanstack/react-router"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Role } from "./role-context"
import { sampleOrders, sellerPayouts, contractorPayouts, sampleBookings, verificationQueue } from "./dashboard-data"
import { bids } from "@/components/jobs/bids-data"
import { jobs } from "@/components/jobs/jobs-data"
import { projects } from "@/components/projects/projects-data"
import { servicePros } from "@/components/services/services-data"

const peso = (n: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(n)

export function RoleTable({ role }: { role: Role }) {
  return (
    <section className="px-4 lg:px-6">
      {role === "client" && <ClientTable />}
      {role === "seller" && <SellerTable />}
      {role === "contractor" && <ContractorTable />}
      {role === "company" && <CompanyTable />}
      {role === "admin" && <AdminTable />}
    </section>
  )
}

function Wrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <div className="overflow-hidden border border-border bg-card">{children}</div>
    </div>
  )
}

function ClientTable() {
  return (
    <Wrapper title="Recent material orders">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleOrders.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-medium">{o.id}</TableCell>
              <TableCell>{o.date}</TableCell>
              <TableCell className="text-right">{o.items}</TableCell>
              <TableCell className="text-right">{peso(o.total)}</TableCell>
              <TableCell className="text-right">
                <Badge variant="outline">{o.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  )
}

function SellerTable() {
  return (
    <Wrapper title="Payouts (bi-weekly cycle)">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ref</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellerPayouts.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.id}</TableCell>
              <TableCell>{p.date}</TableCell>
              <TableCell>{p.source}</TableCell>
              <TableCell className="text-right">{peso(p.amount)}</TableCell>
              <TableCell className="text-right">
                <Badge variant="outline">{p.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  )
}

function ContractorTable() {
  const myBids = bids.filter((b) => b.contractorId === "stormshield-roofing")
  return (
    <div className="space-y-6">
      <Wrapper title="Bids in flight">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead className="text-right">Bid</TableHead>
              <TableHead className="text-right">Timeline</TableHead>
              <TableHead className="text-right">Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myBids.map((b) => {
              const job = jobs.find((j) => j.id === b.jobId)
              return (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">
                    {job ? (
                      <Link
                        to="/jobs/$jobId"
                        params={{ jobId: job.id }}
                        className="hover:text-brand-orange hover:underline"
                      >
                        {job.title}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-right">{peso(b.amount)}</TableCell>
                  <TableCell className="text-right">{b.timelineDays}d</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {b.submittedAgo}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Wrapper>

      <Wrapper title="Earnings">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ref</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contractorPayouts.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell>{p.source}</TableCell>
                <TableCell className="text-right">{peso(p.amount)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{p.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>
    </div>
  )
}

function CompanyTable() {
  const myServices = servicePros.slice(0, 4)
  return (
    <div className="space-y-6">
      <Wrapper title="Live services">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Starts at</TableHead>
              <TableHead className="text-right">Jobs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myServices.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">
                  <Link
                    to="/services/$serviceId"
                    params={{ serviceId: s.id }}
                    className="hover:text-brand-orange hover:underline"
                  >
                    {s.name}
                  </Link>
                </TableCell>
                <TableCell>{s.category}</TableCell>
                <TableCell className="text-right">{s.startingFrom}</TableCell>
                <TableCell className="text-right">{s.jobsCompleted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>

      <Wrapper title="Bookings">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ref</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleBookings.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.id}</TableCell>
                <TableCell>{b.customer}</TableCell>
                <TableCell>{b.service}</TableCell>
                <TableCell className="text-right">{b.date}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{b.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>
    </div>
  )
}

function AdminTable() {
  return (
    <div className="space-y-6">
      <Wrapper title="Verification queue">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ref</TableHead>
              <TableHead>Contractor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verificationQueue.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-medium">{v.id}</TableCell>
                <TableCell>{v.contractorName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{v.type}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{v.submittedAgo}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{v.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>

      <Wrapper title="Recent project activity">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: p.id }}
                    className="hover:text-brand-orange hover:underline"
                  >
                    {p.title}
                  </Link>
                </TableCell>
                <TableCell>Stage {p.stage}</TableCell>
                <TableCell className="text-right">{peso(p.contractValue)}</TableCell>
                <TableCell className="text-right">
                  {p.daysRemaining < 0 && p.daysRemaining > -90 ? (
                    <Badge variant="destructive">Past due</Badge>
                  ) : (
                    <Badge variant="outline">Healthy</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>
    </div>
  )
}
