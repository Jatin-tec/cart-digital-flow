
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BellRing, CheckCircle, Clock } from "lucide-react";
import { useAssistance } from "@/contexts/AssistanceContext";
import { formatDistanceToNow } from "date-fns";

const AssistanceRequests: React.FC = () => {
  const navigate = useNavigate();
  const { requests, resolveRequest, assignRequest } = useAssistance();

  // Add some mock requests if there are none in the context
  const allRequests = requests.length > 0 
    ? requests 
    : [
        {
          id: "req-001",
          cartId: "CART-123",
          customerName: "John Doe",
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          resolved: false,
        },
        {
          id: "req-002",
          cartId: "CART-456",
          customerName: "Jane Smith",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          resolved: true,
          assignedTo: "Mike Staff",
        },
        {
          id: "req-003",
          cartId: "CART-789",
          customerName: "Alex Johnson",
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          resolved: false,
          assignedTo: "Sarah Helper",
        },
      ];
  
  const activeRequests = allRequests.filter(req => !req.resolved);
  const resolvedRequests = allRequests.filter(req => req.resolved);

  const handleResolve = (requestId: string) => {
    resolveRequest(requestId);
  };

  const handleAssign = (requestId: string) => {
    // In a real app, this would open a staff selection modal
    // For demo, we'll just assign it to a fixed staff member
    assignRequest(requestId, "David Staff");
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <header className="bg-neutral-dark text-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/dashboard")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Assistance Requests</h1>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <BellRing className="mr-2 h-6 w-6 text-red-500" />
          Active Requests
        </h2>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          {activeRequests.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No active assistance requests
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-light">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cart ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {request.cartId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {request.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDistanceToNow(request.timestamp, { addSuffix: true })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {request.assignedTo || (
                          <span className="text-gray-500">Not assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          {!request.assignedTo && (
                            <Button
                              size="sm"
                              onClick={() => handleAssign(request.id)}
                            >
                              Assign Staff
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant={request.assignedTo ? "default" : "outline"}
                            onClick={() => handleResolve(request.id)}
                          >
                            Mark Resolved
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mb-4 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          Recently Resolved
        </h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {resolvedRequests.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No resolved requests
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-light">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cart ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resolved By
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resolvedRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {request.cartId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {request.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDistanceToNow(request.timestamp, { addSuffix: true })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {request.assignedTo || "System"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AssistanceRequests;
